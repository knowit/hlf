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
It is recommended that a GCP service account is created with the required permissions, and that a key (`.json`-file) is created and downloaded for said service account.  
It is possible to create service accounts with `Owner` status.

After such a key has been downloaded, set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the key's path. This will allow `gcloud` commands to access the proper resources.

### Downloads
A couple of programs and packages are needed to deploy the API.

* **[Docker][docker-ce]**  
  Used to build an image of the container which our API will run from. Docker will be called as neccessary from other scripts.

* **[Packer][packer]**  
  Builds an image of a Virtual Machine based on specifications from _packer.json_.  
  Packer is run with the command `packer build -var gcpcreds=$GOOGLE_APPLICATION_CREDENTIALS packer.json`, which will (at the end of a long list) output an image ID.

* **[Terraform][terraform]**  
  Configures the virtual infrastructure needed, including starting a VM from the Packer-built image.  
  The Terraform's root folder is _environment/dev/_.  
  Update the `name` field in _environment/dev/main.tf_ to match the latest image ID.  
  Terraform is run with the command `terraform apply`.

* **[Google Cloud SDK][gcsdk]**  
  Google's tool for connecting to GCP.

## Deployment

Docker images used to host the API is preferably stored in the cloud using Google's Container Registry.  
Google's own documentation for this pushing to this register can be found [here](https://cloud.google.com/container-registry/docs/pushing-and-pulling).

1. Build a Packer image.
1. Spin up the infrastructure with Terraform.
1. Build the Docker image by following the guide in _/hlf/api/doc.md_.
1. Push the latest Docker image to GCP by running `python push_docker_image.py`.
1. Make the server start the Docker container by running `gcloud compute ssh godlyd@server-hlf-dev --command="sudo docker-compose up -d"`.  
   The API should be up and running (with `/healthcheck` returing 200 OK) after 30-60 seconds.

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