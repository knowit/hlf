#!/usr/bin/env bash

# Move files uploaded by Packer
sudo mv /tmp/nginx.conf /etc/nginx/
sudo mv /tmp/docker-compose.yml ~/
sudo mkdir ~/.gc
sudo mv /tmp/terraform@godlydpatruljen.json ~/.gc/

# Create folder for ACME Challenges
sudo mkdir -p /var/www/letsencrypt/.well-known/acme-challenge

# Authenticate Docker
sudo gcloud auth configure-docker

# Set up Google Cloud Logging
export DOCKERD=/etc/systemd/system/docker.service.d
export DOCKERCONF=docker-service-override.conf
if [ ! -d "$DOCKERD" ]; then
  sudo mkdir "$DOCKERD"
fi
sudo cat > "/tmp/$DOCKERCONF" <<EOF
[Service]
Environment="GOOGLE_APPLICATION_CREDENTIALS=~/.gc/terraform@godlydpatruljen.json"
EOF
sudo mv "/tmp/$DOCKERCONF" "$DOCKERD/$DOCKERCONF"
sudo systemctl daemon-reload
sudo systemctl restart docker

# Pull Docker image
sudo docker pull eu.gcr.io/godlydpatruljen/server-hlf-dev