import os
import subprocess

os.system("gcloud auth login")
os.system("gcloud config set project godlydpatruljen")
os.system("gcloud auth configure-docker")
image_id = bytes.decode(subprocess.check_output("docker images -q lydpatruljen/godlyd")).replace("\n", "")
os.system("docker tag "+image_id+" eu.gcr.io/godlydpatruljen/server && docker push eu.gcr.io/godlydpatruljen/server")
os.system("gcloud beta compute instances update-container server --container-image eu.gcr.io/godlydpatruljen/server/ --zone europe-west3-a")
