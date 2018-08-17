#!/usr/bin/env bash

# Install Certbot for Ubuntu 16.04
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx

# Start Certbot with auto configuration of Nginx
sudo certbot --nginx