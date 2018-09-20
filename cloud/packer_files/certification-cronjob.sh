#!/usr/bin/env bash

FILE_NAME=renew-certificates
TEMP_FILE=/tmp/$FILE_NAME
CRON_FILE=/etc/cron.d/$FILE_NAME
CERT_SCRIPT=$LOCAL_FOLDER/run-certification.sh

# Create a cronjob to renew SSL Certificates for Load Balancer monthly
sudo cat > $TEMP_FILE <<EOF
0 * * * * $USER_ $CERT_SCRIPT
EOF

sudo mv $TEMP_FILE $CRON_FILE
sudo chmod 644 $CRON_FILE
