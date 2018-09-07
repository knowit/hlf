import argparse
import base64
import gc_storage
import ntpath
import sys


_ENCODING = 'ascii'


def get_file_text(file_path):
    with open(file_path, 'rb') as secret_file:
        plaintext = secret_file.read()
    return plaintext


def encrypt_secret(secret_path,
                   project_name,
                   keyring_name,
                   key_name
                   ):
    crypto_keys = gc_storage.get_crypto_keys(project_name, keyring_name)
    key_long_name = gc_storage.get_key_long_name(project_name, keyring_name, key_name)

    plaintext = get_file_text(secret_path)

    encryption_request = crypto_keys.encrypt(
        name=key_long_name,
        body={
            'plaintext': base64.b64encode(plaintext).decode(_ENCODING)
        }
    )
    encryption_response = encryption_request.execute()
    ciphertext = base64.b64decode(encryption_response['ciphertext'].encode(_ENCODING))

    return ciphertext


def upload_secret(secret_path,
                  project_name,
                  bucket_name,
                  keyring_name,
                  key_name,
                  *args, **kwargs
                  ):
    file_name = ntpath.basename(secret_path)
    destination_file_name = 'secrets/{}.encrypted'.format(file_name)
    ciphertext = encrypt_secret(
        secret_path,
        project_name,
        keyring_name,
        key_name
    )
    bucket = gc_storage.get_bucket(bucket_name)
    blob = bucket.blob(destination_file_name)

    # Check if blob already exists, and if it should be overwritten
    if blob.exists() and not kwargs['overwrite']:
        print(
            '  [ERROR] : File already exists.',
            '  >>  A file named {} already exists in bucket {}/{}.'.format(
                destination_file_name,
                project_name,
                bucket_name
            ),
            '  >>  Use the \'--overwrite\' flag if you want to overwrite this file.',
            sep='\n',
            file=sys.stderr
        )
        sys.exit(-1)
    blob.upload_from_string(ciphertext)


def main():
    argparser = argparse.ArgumentParser()
    argparser.set_defaults(method=upload_secret)

    argparser.add_argument(
        'secret_path',
        help='Path to secret file to upload.'
    )
    argparser.add_argument(
        'project_name',
        help='Name of GCP Project.'
    )
    argparser.add_argument(
        'bucket_name',
        help='Name of GCP bucket where your secrets are found.'
    )
    argparser.add_argument(
        'keyring_name',
        help='Name of GCP keyring where your cryptokey is located.'
    )
    argparser.add_argument(
        'key_name',
        help='Name of GCP cryptokey.'
    )
    argparser.add_argument(
        '--overwrite',
        action='store_true',
        help='Overwrite the stored file if it exists.'
    )

    args = argparser.parse_args()

    args.method(**vars(args))


if __name__ == '__main__':
    main()
