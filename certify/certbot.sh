#!/usr/bin/env bash

# Install Certbot for Ubuntu 16.04
sudo apt-get update
sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt-get update
sudo apt-get install python-certbot-nginx -y

# Start Certbot with auto configuration of Nginx
sudo certbot --nginx \
  --email godlydpatruljen@appspot.gserviceaccount.com \
  --cert-name lydpatruljen \
  --domains