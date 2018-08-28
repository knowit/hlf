#!/usr/bin/env bash

# Move config files
sudo mv /tmp/nginx.conf /etc/nginx/nginx.conf
sudo mv /tmp/docker-compose.yml docker-compose.yml

# Authenticate Docker
sudo gcloud auth configure-docker

# Pull Docker image
sudo docker pull eu.gcr.io/godlydpatruljen/server-hlf-dev

