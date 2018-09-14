# Godlydpatruljen

Three main components, or projects:

* [API](/api)
* [App](/app)
* [Cloud](/cloud)

In addition there is a module called [secrets_handler](/secrets_handler) which is used for en-/decryption and up-/downloading of secrets.

## Setup
The setup for each component is described in separate READMEs, found under the components' root. Nevertheless, there are a few steps which are considered "general", so we will go through them here.

### Docker
Download and install [Docker Community Edition][docker-ce]. The API is deployed as a `.jar` file running inside a Docker container, and both the `api` and `cloud` components needs a running Docker daemon to create and push container images.

### Google Cloud Service Account
One of the reccommended ways to gain access to the GC project and automated tools like `gcloud` is by using what's called a _service account_. This is a non-personal account where access and permissions can be set just as with any normal user account.

The following steps assumes that such a service account already exists, and that it has the necessary permissions for the project.

1. Log in to [Google Cloud Platform][gcp].
1. Via the top-left triple-dash menu, open **IAM &amp; admin** &gt; **Service accounts**.
1. Find the desired service account, click on the triple-dot menu on its far right, and click on **Create key**.
1. Select **JSON** and click **Create**.
1. Download the JSON file to a desired location on your local hard drive.
    - **Note**: No matter where you save your key file, please give it a name on the format `<name of service account>@<name of project>.json`. Other scripts may depend on this naming format.
1. Create a permanent environment variable called `GOOGLE_APPLICATION_CREDENTIALS` and set its value to be the full path of your JSON service account key.

### Python
Python is used for a good many scripts and commands in this project, and is required for everything to work properly.

1. Download and install [Python][python]. The scripts were written and tested with Python 3.6.6, so that's the recommended version.
1. Upgrade [pip][pip] to the latest version:  
   `python -m pip install --upgrade pip`
1. Download [virtualenv][virtualenv] via `pip`:  
   `pip install virtualenv`
1. Make sure your current directory is `hlf`, and create a new virtual environment for Python:  
   `virtualenv env`
    - For more information about this environment, and how to (de)activate it for your system, visit the [virtualenv user guide][virtualenv-guide]
1. Activate your new environment
1. Install the required packages:  
   `pip install -r requirements.txt`
    - If, for some reason, pip isn't installing the packages in the correct location:
        1. Check (and triple-check) that your environment is activated
        1. Install the requirements with the prefix `python -m`:  
           `python -m pip install -r requirements.txt`

## Secrets
Secrets are encrypted and stored in a bucket on Google Cloud Platform. The uploading and downloading of secrets are done in a similar matter: by using either the `upload_secret.py` or `download_secret.py` script found in the [secrets_handler](secrets_handler) folder.

Before up- or downloading secrets, you need the
- project name,
- bucket name,
- keyring name and
- cryptokey name

### Uploading
1. In your terminal, change current directory:  
   `cd hlf/secrets_handler`
1. If `<path>` is the full local path to your secret file, and the rest or the arguments matches those you should have found already, then  
`python upload_secret.py <path> <project name> <bucket name> <keyring> <cryptokey>`  
   will encrypt your file and upload it to a `/secrets` folder in your specified bucket.

**Note:**
- The uploaded secret automatically sets an extra extension on the file name: `.encrypted`.
- If an encrypted secret already exists in the bucket (named `<file name>.encrypted`) then the uploading will fail unless the optional flag `--overwrite` is set.

### Downloading
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

## Deployment
The pipeline is as follows:
1. Follow the steps in [api](api) to
    1. Build the server application as a `.jar`
    1. Build a Docker image
1. Follow the steps in [cloud](cloud) to
    1. Push the Docker image
    1. Build a server image
    1. Setup the infrastructure with Terraform, and start a server instance
    1. Start the server application
1. Follow the steps in [app](app) to build the mobile application to Android and/or iOS


[docker-ce]:        https://store.docker.com/search?type=edition&offering=community
[gcp]:              https://console.cloud.google.com/
[pip]:              https://pypi.org/project/pip/
[python]:           https://www.python.org/downloads/
[virtualenv]:       https://virtualenv.pypa.io/en/stable/installation/
[virtualenv-guide]: https://virtualenv.pypa.io/en/stable/userguide/
