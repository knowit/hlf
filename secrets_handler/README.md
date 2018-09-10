# Google Cloud Storage - Secrets

This 'mini package' consists of two (three) Python scripts to up- and download secrets to and from a GCS bucket.

**The environment variable GOOGLE_APPLICATION_CREDENTIALS must be set, and the connected service account must have read/write bucket permissions.**

## Upload secrets
Script name: `upload_secret.py`

Positional arguments:

1. Path to file
   - Must be full path to file on local system
1. Project name
1. Bucket name
1. Name of keyring
1. Name of cryptokey

Optional argument:

- Overwrite existing file in bucket

### How to run:  
`cd` into the `secrets_handler` folder.  
`python upload_secret.py <path> <project name> <bucket name> <keyring> <cryptokey> [--overwrite]`

The script will encrypt the file with the given key and upload it to the bucket. If the full file path is `/foo/bar/baz.biz`, then the uploaded file will be named `/secrets/bar.biz.encrypted`.  
If the `--overwrite` flag is set any file in the bucket with the same name will be overwritten.


## Download secrets
Script name: `download_secret.py`

Positional agruments:

1. Name of file
    - Filename _only_
    - Assumes `.encrypted` extension. If file name doesn't end with `.encryption` the script will append it to the filename before download and decryption. 
1. Project name
1. Bucket name
1. Name of keyring
1. Name of cryptokey

Optional argument:

- Download to file

### How to run:  
`cd` into the `secrets_handler` folder.  
`python download_secret.py <file name> <project name> <bucket name> <keyring> <cryptokey> [--out <file path>]`

The script will download the secret, decrypt it with the given key and print the result to standard output.  
If the `--out` flag is set, the decrypted secret will be saved to the supplied `<path>`.

- If `<file name>` is `baz.biz.encrypted` and flag is `--out /foo/bar`:
    - -&gt; `/foo/bar/baz.biz`
- `baz.biz` and `--out /foo/bar`:
    - -&gt; `/foo/bar/baz.biz`
- `baz.biz.encrypted` and `--out /foo/bar/faa.fee`
    - -&gt; `/foo/bar/faa.fee`