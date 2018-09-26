#!/usr/bin/env bash

# Move files uploaded by Packer
sudo mv /tmp/nginx.conf /etc/nginx/
sudo mv /tmp/docker-compose.yml $LOCAL_FOLDER/
sudo mv /tmp/godlyd_api.env $LOCAL_FOLDER/
sudo mkdir $LOCAL_FOLDER/.gc
sudo mv /tmp/credentials-$ENV.json $LOCAL_FOLDER/.gc/

# Create folder for ACME Challenges
sudo mkdir -p $ACME_CHALLENGE

# Authenticate Docker
sudo gcloud auth configure-docker

# Set up Google Cloud Logging
export DOCKERDIR=/etc/systemd/system/docker.service.d
export DOCKERCONF=docker-service-override.conf
if [ ! -d "$DOCKERDIR" ]; then
  sudo mkdir -p "$DOCKERDIR"
fi
touch /tmp/$DOCKERCONF
sudo cat > /tmp/$DOCKERCONF <<EOF
[Service]
Environment="GOOGLE_APPLICATION_CREDENTIALS=$LOCAL_FOLDER/.gc/credentials-$ENV.json"
EOF
sudo mv /tmp/$DOCKERCONF $DOCKERDIR/$DOCKERCONF
sudo systemctl daemon-reload
sudo systemctl restart docker

# Pull Docker image
sudo docker pull $DOCKER_IMAGE_TAG