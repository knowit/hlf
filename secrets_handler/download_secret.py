import argparse
import base64
import gc_storage
import ntpath
import sys


_ENCODING = 'ascii'


def decrypt_secret(ciphertext,
                   project_name,
                   keyring_name,
                   key_name
                   ):
    crypto_keys = gc_storage.get_crypto_keys(project_name, keyring_name)
    key_long_name = gc_storage.get_key_long_name(project_name, keyring_name, key_name)

    decryption_request = crypto_keys.decrypt(
        name=key_long_name,
        body={
            'ciphertext': base64.b64encode(ciphertext).decode(_ENCODING)
        }
    )
    decryption_response = decryption_request.execute()
    plaintext = base64.b64decode(decryption_response['plaintext'].encode(_ENCODING))

    return plaintext


def download_secret(secret_name,
                    project_name,
                    bucket_name,
                    keyring_name,
                    key_name,
                    *args, **kwargs
                    ):
    bucket = gc_storage.get_bucket(bucket_name)
    full_file_name = 'secrets/{}{}'.format(
        secret_name,
        # Assume that any encrypted file
        # ends with '.encrypted'.
        ('' if ntpath.splitext(secret_name)[-1] == '.encrypted'
         else '.encrypted')
    )
    secret_blob = bucket.blob(full_file_name)

    ciphertext = secret_blob.download_as_string()
    plaintext = decrypt_secret(
        ciphertext,
        project_name,
        keyring_name,
        key_name
    )

    if kwargs['out']:
        try:
            with open(kwargs['out'], 'wb') as plaintext_file:
                plaintext_file.write(plaintext)
        except IOError as ioe:
            print(ioe, file=sys.stderr)
            print()
            print(plaintext)
    else:
        print(plaintext)


def main():
    argparser = argparse.ArgumentParser()
    argparser.set_defaults(method=download_secret)

    argparser.add_argument(
        'secret_name',
        help='Name of secret file to download.\n' +
             'Assume file name to end with \'.encrypted\'.'
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
        '--out',
        help='If specified, save the decrypted plaintext' +
             ' to the given path.'
    )

    args = argparser.parse_args()

    args.method(**vars(args))


if __name__ == '__main__':
    main()
