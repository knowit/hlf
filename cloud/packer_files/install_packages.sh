#!/usr/bin/env bash

##########################
# Pre-installation setup #
##########################
export DOCKER_CHANNEL=stable
export DOCKER_COMPOSE_VERSION=1.22.0
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common


#################
# Install Nginx #
#################
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl stop nginx


####################################
# Install Certbot for Ubuntu 16.04 #
####################################
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get install -y python-certbot-nginx


####################################
# Install Docker Credential Helper #
####################################
curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v1.5.0/docker-credential-gcr_linux_amd64-1.5.0.tar.gz" \
| tar xz --to-stdout ./docker-credential-gcr > /tmp/docker-credential-gcr \
&& sudo mv /tmp/docker-credential-gcr /usr/bin/docker-credential-gcloud \
&& sudo chmod +x /usr/bin/docker-credential-gcloud


##################
# Install Docker #
##################
# Add Docker's official GPG key.
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# Pick the release channel.
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   ${DOCKER_CHANNEL}"
# Update the apt package index.
sudo apt-get update
# Install the latest version of Docker CE.
sudo apt-get install -y docker-ce
# Install Docker Compose.
sudo curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose &&
sudo chmod +x /usr/local/bin/docker-compose