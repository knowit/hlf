from gc_constants import _EXTENSION
import ntpath


def has_extension(file_name):
    return ntpath.splitext(file_name)[1] == _EXTENSION


def set_extension(file_name):
    if has_extension(file_name):
        return file_name
    else:
        return file_name + _EXTENSION


def remove_extension(file_name):
    if has_extension(file_name):
        return ntpath.splitext(file_name)[0]
    else:
        return file_name


def solve_file_path(secret_name, out):
    if ntpath.isdir(out):
        file_name = remove_extension(secret_name)
        full_path = ntpath.join(out, file_name)

    else:
        full_path = out.strip(_EXTENSION)

    return full_path


def get_file_text(file_path):
    with open(file_path, 'rb') as secret_file:
        plaintext = secret_file.read()
    return plaintext
