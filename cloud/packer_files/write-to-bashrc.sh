#!/usr/bin/env bash

sudo cat >> ~/.bashrc <<EOF
export GOOGLE_APPLICATION_CREDENTIALS=~/.gc/credentials.json
EOF
