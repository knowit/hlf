import googleapiclient.discovery
import sys
from google.cloud import storage


_LOCATION_ID = 'global'


def get_bucket(bucket_name, credentials=None):
    storage_client = storage.Client(credentials=credentials)
    return storage_client.get_bucket(bucket_name)


def get_resource_parent_name(project_name, location_id=_LOCATION_ID):
    return '/'.join([
        'projects',
        project_name,
        'locations',
        location_id
    ])


def get_keyring_long_name(project_name, keyring_name, location_id=_LOCATION_ID):
    return '/'.join([
        get_resource_parent_name(project_name, location_id),
        'keyRings',
        keyring_name
    ])


def get_key_long_name(project_name, keyring_name, key_name, location_id=_LOCATION_ID):
    return '/'.join([
        get_keyring_long_name(project_name, keyring_name, location_id),
        'cryptoKeys',
        key_name
    ])


def get_crypto_keys(project_name, keyring_name, location_id=_LOCATION_ID):
    kms_client = googleapiclient.discovery.build('cloudkms', 'v1')
    resource_parent = 'projects/{}/locations/{}'.format(project_name, location_id)
    keyring_long_name = '{}/keyRings/{}'.format(resource_parent, keyring_name)

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
