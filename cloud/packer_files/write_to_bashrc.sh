#!/usr/bin/env bash

cat >> ~/.bashrc <<EOF
export GCPCREDS_FILENAME=$GCPCREDS_FILENAME
# export DATASOURCE_USER=$DATASOURCE_USER
# export DATASOURCE_PASSWORD=$DATASOURCE_PASSWORD
EOF

source ~/.bashrc