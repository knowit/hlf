import argparse
import gc_cryption
import gc_path
import gc_storage
import ntpath
import sys


def upload_secret(secret_path,
                  project_name,
                  bucket_name,
                  keyring_name,
                  key_name,
                  *args, **kwargs
                  ):
    file_name = ntpath.basename(secret_path)
    destination_file_name = 'secrets/{}'.format(
        gc_path.set_extension(file_name)
    )
    ciphertext = gc_cryption.encrypt_secret(
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


def _get_argparser(start_function):
    argparser = argparse.ArgumentParser()
    argparser.set_defaults(method=start_function)

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

    return argparser


def main():
    argparser = _get_argparser(start_function=upload_secret)
    args = argparser.parse_args()
    args.method(**vars(args))


if __name__ == '__main__':
    main()
