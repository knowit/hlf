#!/usr/bin/env bash

# Install Nginx
sudo apt-get update
sudo apt-get install nginx
sudo systemctl enable nginx
sudo systemctl stop nginx

# Move uploaded config
mv /tmp/nginx.conf /etc/nginx/nginx.conf