# Cloud Solutions for GodLyd
## General
Backend for the project is hosted on Google Cloud Platform (GCP) using a compute engine, sql-server, virtual network, and load balancing. 
The compute engine is built on an image created by Packer, based on Google's Container-Optimized OS, enabling easy deployment of docker images. The overall structure of the cloud solution is built using infrastructure as code (IaC) with Terraform.

**NOTE:**  
* This README assumes that the state of the api is **development**.
* All commands are run with `hlf/cloud` as the current working directory, unless otherwise specified.
* All files and folders assume `hlf/cloud` as root, unless otherwise specified.

## Setup
### Authorization
Follow the steps in the [root README](../), under **Setup** &gt; **Google Cloud Service Account**.

### Downloads
A couple of programs and packages are needed to deploy the API.

* **[Docker][docker-ce]**  
  Used to build an image of the container which our API will run from. Docker will be called as neccessary from other scripts.

* **[Packer][packer]**  
  Builds an image of a Virtual Machine based on specifications from `packer.json`.  
  Packer is run with the command `python cloud.py build-packer`, which will (at the end of a long list) output an image ID.

* **[Terraform][terraform]**  
  Configures the virtual infrastructure needed, including starting a VM from the Packer-built image.  
  The Terraform's root folder is `environment/dev/`.  
  Update the `name` field in `environment/dev/main.tf` to match the latest image ID.  
  Terraform is run with the command `terraform apply`.

* **[Google Cloud SDK][gcsdk]**  
  Google's tool for connecting to GCP.

### Download secrets

**Docker environment variables**  
When building a server image with Packer, an `.env` file must be present. This file will be saved to the image during building, and is used by Docker Compose when starting a server container.

**Project variables**  
Luckily for us there are some variables that must be set! As these are not shared between modules, and are not globally needed for e.g. `gcloud`, they are not stored as environment variables.

To download the secrets, follow the steps below:

1. Find the
    - project name
    - bucket name
    - keyring name
    - cryptokey name
1. Change current directory:  
   `cd hlf/secrets_handler`
1. Download the `.env` and `gcp.json` files by calling:  
   `python download_secret.py <file name> <project name> <bucket name> <keyring> <cryptokey> --out ../secrets`  
   where `<file name>` should be substituted for `.env` and `gcp.json`, and the rest of the argument should match the names from point 1.


### Project variables
Luckily for us there are some variables that must be set! As these are not shared between modules, and are not globally needed for e.g. `gcloud`, they are not stored as environment variables.

Create a file named `gcp.json` inside `hlf/secrets`:
```json
{
    "user": "",
    "ssh_user": "",
    "project": "",
    "image_name": "",
    "image_tag": "",
    "instance_name": "",
    "zone": "",
    "api_ip": "",
    "api_network": ""
}
```
For each field, fill in the appropriate value for your project. This file will be read and used when (amongst other things) pushing Docker images to the Google Cloud repository.

### Docker Compose (yml)
The server needs a file called `docker-compose.yml` to be able to start the API container. A template file called `docker-compose.yml.pytemplate` is used as a baseline, and is combined with a few variables from `gcp.json`.

Run this command to generate the complete `.yml` file:  
`python cloud.py compose-yml`

## Deployment

Docker images used to host the API is preferably stored in the cloud using Google's Container Registry.  
Google's own documentation for this pushing to this register can be found [here](https://cloud.google.com/container-registry/docs/pushing-and-pulling).

1. Download and generate all necessary secrets.
1. Build a Docker image by following the [API guide](../api).
1. Build a Packer image with  
   `python cloud.py build-packer`.
1. Spin up the infrastructure with Terraform.
    - `cd hlf/cloud/environment/dev`
    - `terraform init`
    - `terraform plan`
    - `terraform apply`
1. Push the latest Docker image to GCP by running  
   `python cloud.py push-docker`.
1. Make the server start the Docker container by running  
   `python cloud.py start-server`.  
    - The API should be up and running (with `/healthcheck` returing 200 OK) after 30-60 seconds.

## Security
### SSL Certificates
[Certbot][certbot] is a tool for automatic creation, verification and renewal of SSL Certificates, through the Certificate Authority _**Let’s Encrypt**_. This first command tells Certbot to create a certificate and private key. An e-mail address is required.
```
sudo certbot certonly \
--manual \
--agree-tos \
--manual-public-ip-logging-ok \
--no-eff-email \
--email <your email address> \
--domain dev.api.godlypatruljen.no
```

This second command creates a Google Cloud Certificate Resource by uploading the certificate and key to our GCP project. This enables us to use the certificate for Google's load balancer service, which all traffic to and from the API must pass through.
```
sudo gcloud compute ssl-certificates \
create godlyd-cert \
--certificate=/etc/letsencrypt/live/dev.api.godlypatruljen.no/fullchain.pem \
--private-key=/etc/letsencrypt/live/dev.api.godlypatruljen.no/privkey.pem
```

[docker-ce]: https://store.docker.com/search?type=edition&offering=community
[packer]: https://www.packer.io/downloads.html
[terraform]: https://www.terraform.io/downloads.html
[gcsdk]: https://cloud.google.com/sdk/
[certbot]: https://certbot.eff.org/