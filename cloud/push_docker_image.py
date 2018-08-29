import os
from sys import exit, stderr

try:
    user = os.environ['GOOGLE_APPLICATION_USER']
    key_file = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
    project = os.environ['GOOGLE_APPLICATION_PROJECT']
    image_name = os.environ['GOOGLE_DOCKER_IMAGE_NAME']
    image_tag = os.environ['GOOGLE_DOCKER_IMAGE_TAG']
    instance_name = os.environ['GOOGLE_DOCKER_INSTANCE_NAME']
    zone = os.environ['GOOGLE_APPLICATION_ZONE']
except KeyError as env_var_error:
    print('Environment variable not found.', file=stderr)
    print('Missing key: "{}"'.format(env_var_error), file=stderr)
    exit(-1)

os.system('gcloud auth activate-service-account {} --key-file {}'.format(user, key_file))
os.system('gcloud config set project {}'.format(project))
os.system('gcloud auth configure-docker')
image_id = os.popen('docker images -q {}'.format(image_name)).read().replace('\n', '')
os.system('docker tag {} {}'.format(image_id, image_tag))
os.system('docker push {}'.format(image_tag))
# os.system('gcloud beta compute instances update-container {} --container-image {} --zone {}'
#           .format(instance_name, image_tag, zone))
# os.system(' '.join([
#     'gcloud compute ssh',
#     '--zone {}'.format(zone),
#     '{}'.format(instance_name),
#     '--',
#     # Command to run on instance
#     '"sudo docker pull {0} && sudo docker run -d -p 8080:8080 {0}"'.format(image_tag)
# ]))


# curl -fsSL "https://github.com/GoogleCloudPlatform/docker-credential-gcr/releases/download/v1.5.0/docker-credential-gcr_linux_amd64-1.5.0.tar.gz" \
# | tar xz --to-stdout ./docker-credential-gcr \
# > /usr/bin/docker-credential-gcr && chmod +x /usr/bin/docker-credential-gcr