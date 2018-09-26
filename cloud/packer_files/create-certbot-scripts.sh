#!/usr/bin/env bash

CERTBOT_HOOKS=$LOCAL_FOLDER/.certbot-hooks

sudo cat > /tmp/run-certification.sh <<EOF
#!/usr/bin/env bash

CERT_NAME=godlyd-cert-$ENV-\$(date +%s)

# Generate certificate
sudo certbot certonly \\
--manual \\
--domain $GODLYD_DOMAIN \\
--preferred-challenges=http \\
--agree-tos \\
--manual-public-ip-logging-ok \\
--no-eff-email \\
--email $CERTIFICATE_CONTACT_EMAIL \\
--manual-auth-hook $CERTBOT_HOOKS/authenticator.sh \\
--manual-cleanup-hook $CERTBOT_HOOKS/cleanup.sh

# Upload certificate to Google Cloud Platform
sudo gcloud compute ssl-certificates \\
create \$CERT_NAME \\
--certificate=$CERTIFICATE_OUTPUT/$GODLYD_DOMAIN/fullchain.pem \\
--private-key=$CERTIFICATE_OUTPUT/$GODLYD_DOMAIN/privkey.pem

# Update HTTPS-proxy with the new certificate
sudo gcloud compute target-https-proxies \\
update $HTTPS_PROXY_NAME \\
--ssl-certificates=\$CERT_NAME
EOF

sudo cat > /tmp/authenticator.sh <<EOF
#!/bin/bash
echo \$CERTBOT_VALIDATION > $ACME_CHALLENGE/\$CERTBOT_TOKEN
EOF

sudo cat > /tmp/cleanup.sh <<EOF
#!/bin/bash
rm -f $ACME_CHALLENGE/\$CERTBOT_TOKEN
EOF

sudo mkdir -p $CERTBOT_HOOKS

sudo mv /tmp/run-certification.sh $LOCAL_FOLDER/
sudo mv /tmp/authenticator.sh $CERTBOT_HOOKS/
sudo mv /tmp/cleanup.sh $CERTBOT_HOOKS/

sudo chmod 755 $LOCAL_FOLDER/run-certification.sh
sudo chmod 755 $CERTBOT_HOOKS/authenticator.sh
sudo chmod 755 $CERTBOT_HOOKS/cleanup.sh
