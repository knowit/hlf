import base64
from gc_constants import _ENCODING, _LOCATION_ID
import gc_path
import googleapiclient.discovery
import sys


def get_resource_parent_name(project_name, location_id):
    return '/'.join([
        'projects',
        project_name,
        'locations',
        location_id
    ])


def get_keyring_long_name(project_name, keyring_name, location_id):
    return '/'.join([
        get_resource_parent_name(project_name, location_id),
        'keyRings',
        keyring_name
    ])


def get_key_long_name(project_name, keyring_name, key_name, location_id):
    return '/'.join([
        get_keyring_long_name(project_name, keyring_name, location_id),
        'cryptoKeys',
        key_name
    ])


def get_crypto_keys(project_name, keyring_name, location_id):
    kms_client = googleapiclient.discovery.build('cloudkms', 'v1')
    resource_parent = get_resource_parent_name(project_name, location_id)
    keyring_long_name = get_keyring_long_name(
        project_name,
        keyring_name,
        location_id
    )

    # Validate that the requested key exists
    keyring_request = kms_client\
        .projects()\
        .locations()\
        .keyRings()\
        .list(parent=resource_parent)
    keyring_response = keyring_request.execute()
    keyring = None
    if 'keyRings' in keyring_response and keyring_response['keyRings']:
        for kR in keyring_response['keyRings']:
            if kR['name'] == keyring_long_name:
                keyring = kR
                break
    if keyring is None:
        print(
            'No keyring of name "{}" found.\n(Long name: "{}")'
            .format(keyring_name, keyring_long_name),
            file=sys.stderr
        )
        sys.exit(-1)

    # Get crypto keys, given that the key(s) exist
    crypto_keys = kms_client.projects().locations().keyRings().cryptoKeys()
    return crypto_keys


def encrypt_secret(secret_path,
                   project_name,
                   keyring_name,
                   key_name
                   ):
    crypto_keys = get_crypto_keys(
        project_name,
        keyring_name,
        _LOCATION_ID
    )
    key_long_name = get_key_long_name(
        project_name,
        keyring_name,
        key_name,
        _LOCATION_ID
    )

    plaintext = gc_path.get_file_text(secret_path)

    encryption_request = crypto_keys.encrypt(
        name=key_long_name,
        body={
            'plaintext': base64.b64encode(plaintext).decode(_ENCODING)
        }
    )
    encryption_response = encryption_request.execute()
    ciphertext = base64.b64decode(
        encryption_response['ciphertext'].encode(_ENCODING)
    )

    return ciphertext


def decrypt_secret(ciphertext,
                   project_name,
                   keyring_name,
                   key_name
                   ):
    crypto_keys = get_crypto_keys(
        project_name,
        keyring_name,
        _LOCATION_ID
    )
    key_long_name = get_key_long_name(
        project_name,
        keyring_name,
        key_name,
        _LOCATION_ID
    )

    decryption_request = crypto_keys.decrypt(
        name=key_long_name,
        body={
            'ciphertext': base64.b64encode(ciphertext).decode(_ENCODING)
        }
    )
    decryption_response = decryption_request.execute()
    plaintext = base64.b64decode(
        decryption_response['plaintext'].encode(_ENCODING)
    )

    return plaintext
