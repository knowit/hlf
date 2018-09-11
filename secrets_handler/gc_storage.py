from google.cloud import storage


def get_bucket(bucket_name, credentials=None):
    storage_client = storage.Client(credentials=credentials)
    return storage_client.get_bucket(bucket_name)
