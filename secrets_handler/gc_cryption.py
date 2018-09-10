import base64
from gc_constants import _ENCODING
import gc_storage
import gc_path


def encrypt_secret(secret_path,
                   project_name,
                   keyring_name,
                   key_name
                   ):
    crypto_keys = gc_storage.get_crypto_keys(project_name, keyring_name)
    key_long_name = gc_storage.get_key_long_name(project_name, keyring_name, key_name)

    plaintext = gc_path.get_file_text(secret_path)

    encryption_request = crypto_keys.encrypt(
        name=key_long_name,
        body={
            'plaintext': base64.b64encode(plaintext).decode(_ENCODING)
        }
    )
    encryption_response = encryption_request.execute()
    ciphertext = base64.b64decode(encryption_response['ciphertext'].encode(_ENCODING))

    return ciphertext


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
