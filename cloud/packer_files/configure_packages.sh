#!/usr/bin/env bash

# Move files uploaded by Packer
sudo mv /tmp/nginx.conf /etc/nginx/
sudo mv /tmp/docker-compose.yml ~/
sudo mv /tmp/.env ~/
sudo mkdir ~/.gc
sudo mv /tmp/credentials.json ~/.gc/

# Create folder for ACME Challenges
sudo mkdir -p /var/www/letsencrypt/.well-known/acme-challenge

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
Environment="GOOGLE_APPLICATION_CREDENTIALS=~/.gc/credentials.json"
EOF
sudo mv /tmp/$DOCKERCONF $DOCKERDIR/$DOCKERCONF
sudo systemctl daemon-reload
sudo systemctl restart docker

# Pull Docker image
sudo docker pull eu.gcr.io/godlydpatruljen/server-hlf-dev