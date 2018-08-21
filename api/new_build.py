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

# Get access to GC Bucket
storage_client = storage.Client()
secret_bucket = storage_client.get_bucket(BUCKET_NAME)
secret_blob = secret_bucket.blob(SECRET_FILE_NAME)

# Download encrypted secrets as string
secret_blob_content = base64.b64decode(secret_blob.download_as_string())
secret_text = base64.b64encode(secret_blob_content).decode(ENCODING)


###################
# DECRYPT SECRETS #
###################

# Set up names and locations
kms_client = googleapiclient.discovery.build('cloudkms', 'v1')
resource_parent = 'projects/{}/locations/global'.format(PROJECT_NAME)
keyring_long_name = '{}/keyRings/{}'.format(resource_parent, KEYRING_NAME)
key_long_name = '{}/cryptoKeys/{}'.format(keyring_long_name, KEY_NAME)

# Get keyring
keyring_request = kms_client.projects().locations().keyRings().list(parent=resource_parent)
keyring_response = keyring_request.execute()
keyring = None
if 'keyRings' in keyring_response and keyring_response['keyRings']:
    for kR in keyring_response['keyRings']:
        if kR['name'] == keyring_long_name:
            keyring = kR
if keyring is None:
    print('No keyring of name "{}" found.\n(Long name: "{}")'.format(KEYRING_NAME, keyring_long_name), file=stderr)
    exit(-1)

# Decrypt secrets
crypto_keys = kms_client.projects().locations().keyRings().cryptoKeys()
crypto_request = crypto_keys.decrypt(
    name=key_long_name,
    body={'ciphertext': secret_text}
)
crypto_response = crypto_request.execute()
plaintext = base64.b64decode(crypto_response['plaintext'].encode(ENCODING))


######################
# BUILD DOCKER IMAGE #
######################

docker_client = docker.from_env()
build_args = json.loads(plaintext, encoding=ENCODING)
# for key, value in build_args.items():
#     del build_args[key]
#     build_args[str.upper(key)] = value

docker_client.images.build(
    path=API_FOLDER,
    buildargs=build_args,
    tag=DOCKER_TAG,
    nocache=True
)

maven_install_command = 'mvn install dockerfile:build -Dmaven.test.skip=true'
os.system(maven_install_command)
