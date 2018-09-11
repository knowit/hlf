import argparse
import base64
import docker
import json
import os
from sys import exit, stderr
import googleapiclient.discovery
from google.cloud import storage

####################
# STRING VARIABLES #
####################

# Environment variable GOOGLE_APPLICATION_CREDENTIALS must be set

API_FOLDER = os.path.dirname(os.path.realpath(__file__))
ENCODING = 'ascii'

PROJECT_NAME = 'godlydpatruljen'
BUCKET_NAME = 'eu.artifacts.godlydpatruljen.appspot.com'

SECRET_FILE_NAME = 'secrets.encrypted.txt'
PLAINTEXT_FILE_NAME = 'secrets.txt'
DOCKER_TAG = 'lydpatruljen/godlyd'

KEYRING_NAME = 'storage'
KEY_NAME = 'mainKey'


####################
# DOWNLOAD SECRETS #
####################

def get_secret_text():
    # Get access to GC Bucket
    storage_client = storage.Client()
    secret_bucket = storage_client.get_bucket(BUCKET_NAME)
    secret_blob = secret_bucket.blob(SECRET_FILE_NAME)

    # Download encrypted secrets as string
    secret_blob_content = base64.b64decode(secret_blob.download_as_string())
    secret_text = base64.b64encode(secret_blob_content).decode(ENCODING)

    return secret_text


###################
# DECRYPT SECRETS #
###################

def decrypt_secret_text(secret_text):
    # Set up names and locations
    kms_client = googleapiclient.discovery.build('cloudkms', 'v1')
    resource_parent = 'projects/{}/locations/global'.format(PROJECT_NAME)
    keyring_long_name = '{}/keyRings/{}'.format(resource_parent, KEYRING_NAME)
    key_long_name = '{}/cryptoKeys/{}'.format(keyring_long_name, KEY_NAME)

    # Get keyring
    keyring_request = kms_client.projects()\
        .locations()\
        .keyRings()\
        .list(parent=resource_parent)
    keyring_response = keyring_request.execute()
    keyring = None
    if 'keyRings' in keyring_response and keyring_response['keyRings']:
        for kR in keyring_response['keyRings']:
            if kR['name'] == keyring_long_name:
                keyring = kR
    if keyring is None:
        print(
            'No keyring of name "{}" found.\n(Long name: "{}")'
            .format(KEYRING_NAME, keyring_long_name),
            file=stderr
        )
        exit(-1)

    # Decrypt secrets
    crypto_keys = kms_client.projects().locations().keyRings().cryptoKeys()
    crypto_request = crypto_keys.decrypt(
        name=key_long_name,
        body={'ciphertext': secret_text}
    )
    crypto_response = crypto_request.execute()
    plaintext = base64.b64decode(crypto_response['plaintext'].encode(ENCODING))

    return plaintext


######################
# BUILD DOCKER IMAGE #
######################

def build_docker_image(plaintext_extra_args=None):

    # Build .jar-file of the API
    maven_install_command = ' '.join([
        'mvn install dockerfile:build',
        '-Dmaven.test.skip=true',
        # '-Dspring.profiles.active=dev'
    ])
    os.system(maven_install_command)

    # Get local Docker client
    docker_client = docker.from_env()
    # Set standard build arguments for this project
    build_args_dict = {
        'path': API_FOLDER,
        'tag': DOCKER_TAG,
        'nocache': True
    }

    # Check if extra build arguments are present,
    # and if so, use them
    if plaintext_extra_args:
        extra_args = json.loads(plaintext_extra_args, encoding=ENCODING)

        # Make keys upper case (to match Dockerfile ARGs)
        for k, v in extra_args.items():
            del extra_args[k]
            extra_args[str.upper(k)] = v

        # Add extra build arguments to the dictionary
        build_args_dict['buildargs'] = extra_args

    # Build Docker image
    docker_client.images.build(**build_args_dict)


def _get_argument_parser():
    argparser = argparse.ArgumentParser()
    argparser.add_argument(
        '--gcs-build-args',
        action='store_true'
    )
    return argparser


def run(with_extra_build_args=False):
    if with_extra_build_args:
        secret_text = get_secret_text()
        plaintext = decrypt_secret_text(secret_text)
        build_docker_image(plaintext)
    else:
        build_docker_image()


if __name__ == '__main__':
    argparser = _get_argument_parser()
    args = argparser.parse_args()

    # Only build EITHER with OR without extra build arguments (plaintext),
    # using secrets from Google Cloud.
    run(args.gcs_build_args)
