import argparse
import gc_cryption
import gc_storage
import gc_path


def download_secret(secret_name,
                    project_name,
                    bucket_name,
                    keyring_name,
                    key_name,
                    *args, **kwargs
                    ):
    bucket = gc_storage.get_bucket(bucket_name)
    full_file_name = 'secrets/{}'.format(
        # Assume that any encrypted file
        # ends with '.encrypted'.
        gc_path.set_extension(secret_name)
    )
    secret_blob = bucket.blob(full_file_name)

    ciphertext = secret_blob.download_as_string()
    plaintext = gc_cryption.decrypt_secret(
        ciphertext,
        project_name,
        keyring_name,
        key_name
    )

    if kwargs['out']:
        file_path = gc_path.solve_file_path(secret_name, kwargs['out'])
        gc_path.save_to_file(file_path, plaintext, create_dir=True)
    else:
        print(plaintext)


def _get_argparser(start_function):
    argparser = argparse.ArgumentParser()
    argparser.set_defaults(method=start_function)

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

    return argparser


def main():
    argparser = _get_argparser(start_function=download_secret)
    args = argparser.parse_args()
    args.method(**vars(args))


if __name__ == '__main__':
    main()
