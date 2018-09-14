# Google Cloud Storage - Secrets

Secrets are encrypted and stored in a bucket on Google Cloud Platform. The uploading and downloading of secrets are done in a relatively simple matter: by using either the `upload_secret.py` or `download_secret.py` script found in this folder.

**The environment variable GOOGLE_APPLICATION_CREDENTIALS must be set, and the connected service account must have read/write bucket permissions.**

Before up- or downloading secrets, you need the
- project name,
- bucket name,
- keyring name and
- cryptokey name

## Uploading
1. In your terminal, change current directory:  
   `cd hlf/secrets_handler`
1. If `<path>` is the full local path to your secret file, and the rest or the arguments matches those you should have found already, then  
`python upload_secret.py <path> <project name> <bucket name> <keyring> <cryptokey>`  
   will encrypt your file and upload it to a `/secrets` folder in your specified bucket.

**Note:**
- The uploaded secret automatically sets an extra extension on the file name: `.encrypted`.
- If an encrypted secret already exists in the bucket (named `<file name>.encrypted`) then the uploading will fail unless the optional flag `--overwrite` is set.

## Downloading
1. In your terminal, change current directory:  
   `cd hlf/secrets_handler`
1. If `<file name>` is the name of your secret file, and the rest or the arguments matches those you should have found already, then  
`python download_secret.py <file name> <project name> <bucket name> <keyring> <cryptokey> --out ../secrets`  
   will download and decrypt your file, and save it as `hlf/secrets/<file name>`.

**Note:**
- The script assumes that the files are stored in the bucket with an `.encrypted` extension.
    - Both a `<file name>` of `foo.txt` and `foo.txt.encrypted` will make the script search for a secret named `foo.txt.encrypted`.
    - If no such secret is found, then the script will fail, i.e. the scipt _can not_ download and decrypt a file unless it is stored in the bucket with an `.encryption` extension. (This will always be done automatically when encrypting and uploading with `upload_secret.py`)
    - The saved file will _not_ have the `.encrypted` extension (for obvious reasons).
- The `--out <path>` flag tells the script where to save the decrypted file locally. `<path>` can be absolute or relative.
    - If `<path>` is a directory then the secret will saved as `<path>/<file name>`.
    - If `<path>` is a full file path, then that will be the name of the file, regardless of the value of `<file name>`.
    - If `--out <path>` is _not_ set, then the decrypted contents of the secret will be sent to the standard output.


## Other files and functions

`gc_constants`  
Constants to be used throughout the package.

`gc_cryption`  
Contains functions to encrypt and decrypt files, and to handle keyrings and cryptokeys.

`gc_path`  
Contains functions to handle the `.encryption` extension, as well as solving file paths in a consistent manner.

`gc_storage`  
`get_bucket()` connects to GC Storage and retrieves a bucket, which can be used to fetch and store files (blobs).
