# Godlydpatruljen

Three main components, or projects:

* [API](/api)
* [App](/app)
* [Cloud](/cloud)

In addition there is a module called [secrets_handler](/secrets_handler) which is used for en-/decryption and up-/downloading of secrets.

**Note:** This README, and all READMEs for all components, assume that the state of this project is **development**.

## Setup
The setup for each component is described in separate READMEs, found under the components' root. Nevertheless, there are a few steps which are considered "general", so we will go through them here.

### Docker
Download and install [Docker Community Edition][docker-ce]. The API is deployed as a `.jar` file running inside a Docker container, and both the `api` and `cloud` components needs a running Docker daemon to create and push container images.

### Google Cloud Service Account
One of the reccommended ways to gain access to the GC project and automated tools like `gcloud` is by using what's called a _service account_. This is a non-personal account where access and permissions can be set just as with any normal user account.

It is recommended to use a service account to authenticate CLI tools, even for local development.

This project depends on _two_ service accounts: one with **Owner** permissions to use during development, and one with restricted permissions for automated use.

#### Something, something permissions

The (restricted) service account needs a certain set of permissions to work properly:

- **Project permission**
    - _cloudkms.keyRings.list_

- **Bucket permissions**  
  (The [artifact bucket / registry][docker-registry] where Docker images are pushed to.)
    - [Manually set][gcloud-set-acl] the service account as _Storage Admin_ for the bucket.

- **Crypto Key permissions**
    - _cloudkms.cryptoKeyVersions.get_
    - _cloudkms.cryptoKeyVersions.list_
    - _cloudkms.cryptoKeyVersions.useToDecrypt_
    - _cloudkms.cryptoKeys.get_
    - _cloudkms.cryptoKeys.list_
    - _cloudkms.keyRings.get_
    - _cloudkms.keyRings.list_
    - _resourcemanager.projects.get_

**Note:**  
Individual permissions can't be set in GCloud, but must be set indirectly via a role. It is recommended to create a new role to list key rings, and another for the usage of crypto keys.

[This link][gcloud-kms-iam] provides some help with setting and removing roles via the CLI.

#### Creating service accounts
1. Log in to [Google Cloud Platform][gcp].
1. Via the top-left triple-dash menu, open **IAM &amp; admin** &gt; **Service accounts**.
1. Click **Create Service Account** in the top bar.
    1. Create a name and an ID for the account.  
      **Note:** The ID is what will be used for identifying the account, while "Name" is just a convenience tag.
    1. Set a role for the account. This role will have "Project" as scope.  
      Use "Owner" for the development account.  
      Use the custom role with the _cloudkms.keyRings.list_ permission for the automated account.
1. Set permissions for the automated service account according to the steps above.

#### Authenticate with a service account
1. Log in to [Google Cloud Platform][gcp].
1. Via the top-left triple-dash menu, open **IAM &amp; admin** &gt; **Service accounts**.
1. Find the service account with "Owner" permissions, click on the triple-dot menu on its far right, and click on **Create key**.
1. Select **JSON** and click **Create**.
1. Download the JSON file to a desired location on your local hard drive.
1. Create a permanent environment variable called `GOOGLE_APPLICATION_CREDENTIALS` and set its value to be the full path of your JSON service account key.
1. Now create and download a key for the automated service account, and save the file as `hlf/secrets/credentials.json`.

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
[docker-registry]:  https://cloud.google.com/container-registry/docs/access-control#granting_users_and_other_projects_access_to_a_registry
[gcp]:              https://console.cloud.google.com/
[gcloud-set-acl]:   https://cloud.google.com/storage/docs/access-control/create-manage-lists#set-an-acl
[gcloud-kms-iam]:   https://cloud.google.com/kms/docs/iam#kms-add-member-to-cryptokey-policy-cli
[pip]:              https://pypi.org/project/pip/
[python]:           https://www.python.org/downloads/
[virtualenv]:       https://virtualenv.pypa.io/en/stable/installation/
[virtualenv-guide]: https://virtualenv.pypa.io/en/stable/userguide/
