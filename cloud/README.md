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
2. Sign in to gcloud (i.e. by using "gcloud auth login")
3. Configure docker authentication using "gcloud auth configure-docker"

You should now be able to push images to the registry, as long as the logged in user has access to the project. 
This quick start is based on the assumption that the docker images is already available locally. If not, follow the guide on:
https://docs.docker.com/get-started/

Next up, tag the docker image accordingly:
```
docker tag [SOURCE_IMAGE] eu.gcr.io/godlydpatruljen/server
```
Then push into the registry:
```
docker push eu.gcr.io/godlydpatruljen/server
```
The docker images should now be available in the container registry, feel free to confirm this in the console or by using:
```
gcloud container images list-tags eu.gcr.io/godlydpatruljen/server
```
Now that the image is pushed, we can update the server by using:
```
gcloud beta compute instances update-container server --container-image eu.gcr.io/godlydpatruljen/server/
```

