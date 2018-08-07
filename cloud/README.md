# Cloud Solutions for GodLyd
## General
Backend for the project is hosted on Google Cloud, using a compute engine, sql-server, virtual network, and load balancing. 
The compute engine is built on an image created by Packer, based on Google's Container-Optimized OS, enabling easy deployment of docker images. The overall structure of the cloud solution is built using infrastructure as code (IaC) with Terraform. 

## Deployment quick start
### (* Requires authorization)

Docker images used to host the API is preferably stored in the cloud using Google's Container Registry. 
Google's own documentation for this pushing to this register can be found at:
https://cloud.google.com/container-registry/docs/pushing-and-pulling

1. Download google cloud sdk (which includes gcloud) from https://cloud.google.com/sdk/docs/
2. Build the docker image by following the guide in /hlf/api/doc.md
3. Run the deployment script by running the command 'python deploy.py' from the cloud folder.

The script will push the docker image to the registry and update the server, as long as the logged in user has access to the project. 
```

