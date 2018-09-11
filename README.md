# Godlydpatruljen

Three main components, or projects:

* [API](/api)
* [App](/app)
* [Cloud](/cloud)

In addition there is a module called [secrets_handler](/secrets_handler) which is used for en-/decryption and up-/downloading of secrets.

## Setup
The setup for each component is described in separate READMEs, found under the components' root. Nevertheless, there are a few steps which are considered "general", so we will go through them here.

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


[gcp]:      https://console.cloud.google.com
