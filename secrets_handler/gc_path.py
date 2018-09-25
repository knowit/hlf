import errno
from gc_constants import _EXTENSION
import os
import sys


def has_extension(file_name):
    return os.path.splitext(file_name)[1] == _EXTENSION


def set_extension(file_name):
    if has_extension(file_name):
        return file_name
    else:
        return file_name + _EXTENSION


def remove_extension(file_name):
    if has_extension(file_name):
        return os.path.splitext(file_name)[0]
    else:
        return file_name


def get_file_text(file_path):
    with open(file_path, 'rb') as secret_file:
        plaintext = secret_file.read()
    return plaintext


def save_to_file(file_path, content, create_dir=False, repeated=False):
    try:
        with open(file_path, 'wb') as _file:
            _file.write(content)
    except IOError as ioe:
        print(ioe, file=sys.stderr)
        if ioe.errno == errno.ENOENT and create_dir and not repeated:
            # errno.ENOENT -> No such file or directory
            folder = os.path.dirname(file_path)
            print(
                'Creating folder {}'.format(os.path.dirname(file_path)),
                file=sys.stderr
            )
            os.makedirs(folder)
            save_to_file(file_path, content, create_dir=True, repeated=True)


def solve_file_path(secret_name, out=None):
    # TODO: This function does too much
    # Need to split it into smaller, more manageable functions

    end_with_sep = out.endswith(os.path.sep)

    out = os.path.abspath(os.path.realpath(out)) \
        if out is not None \
        else None

    if end_with_sep and not os.path.isdir(out):
        os.makedirs(out)

    if out and os.path.isdir(out):
        file_name = remove_extension(secret_name)
        full_path = os.path.join(out, file_name)

    elif out:
        full_path = remove_extension(out)

    elif os.path.isfile(secret_name):
        full_path = secret_name

    else:
        full_path = os.path.abspath(os.path.realpath(secret_name))

    return full_path
