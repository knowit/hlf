import argparse
import json
import os
import subprocess
import sys
from time import sleep

###########################################################
# File locations relative to this script and project root #
###########################################################
__PROJECT_ROOT = os.path.dirname(os.path.dirname(
    os.path.abspath(os.path.realpath(__file__))
))
__DOCKER_COMPOSE_FILE = os.path.join(
    __PROJECT_ROOT,
    'cloud',
    'packer_files',
    'docker-compose.yml'
)
__SECRET_FOLDER = os.path.join(
    __PROJECT_ROOT,
    'secrets'
)
__DOCKER_ENV_FILE = os.path.join(
    __SECRET_FOLDER,
    '.env'
)
__GCP_JSON_FILE = os.path.join(
    __SECRET_FOLDER,
    'gcp.json'
)

with open(__GCP_JSON_FILE, 'r') as json_file:
    __VARS = json.load(json_file)


##############################
# Wrapper for 'packer build' #
##############################
def build_packer():
    (
        gcpgreds_location,
        gcpcreds_filename
    ) = _split_file_path_and_name(os.environ['GOOGLE_APPLICATION_CREDENTIALS'])

    packer_run_command = ' '.join([
        'packer build',
        '-var gcpcreds_location={}'.format(gcpgreds_location),
        '-var gcpcreds_filename={}'.format(gcpcreds_filename),
        'packer.json'
    ])

    os.system(packer_run_command)


#############################
# Wrapper for 'docker push' #
#############################
def push_docker():
    image_id = os.popen(
        'docker images -q {}'.format(__VARS['image_name'])
    ).read().replace('\n', '')

    commands = [
        'gcloud auth activate-service-account {} --key-file {}'.format(
            __VARS['user'], os.environ['GOOGLE_APPLICATION_CREDENTIALS']
        ),

        'gcloud config set project {}'.format(
            __VARS['project']
        ),

        'gcloud auth configure-docker',

        'docker tag {} {}'.format(
            image_id, __VARS['image_tag']
        ),

        'docker push {}'.format(
            __VARS['image_tag']
        )
    ]

    for command in commands:
        os.system(command)


###################################
# Wrapper for 'docker-compose up' #
###################################
def start_server():
    docker_command = 'sudo docker-compose up -d'
    gcloud_command = 'gcloud compute ssh {}@{} --command="{}"'.format(
        __VARS['ssh_user'],
        __VARS['instance_name'],
        docker_command
    )

    print(
        'Attempting to ssh into {} and start the Docker container'
        .format(__VARS['instance_name'])
    )

    max_attempts = 3
    wait_length = 3  # seconds
    for i in range(1, max_attempts + 1):
        print('Attempt {}/{}\nWaiting...'.format(i, max_attempts))
        completed_process = subprocess.run(
            gcloud_command,
            shell=True
        )
        if completed_process.returncode != 0:
            if i < max_attempts:
                print(
                    'Couldn\'t connect to the instance. Waiting {} seconds.'
                    .format(wait_length)
                )
                sleep(wait_length)
            else:
                print(
                    'Tried {} times without success. Exiting.'
                    .format(max_attempts)
                )
                sys.exit(1)
        else:
            print('Command executed successfully!')
            break

    os.system(gcloud_command)


####################################################
# Create a configuration file for 'docker-compose' #
####################################################
def compose_yml():
    with open(__DOCKER_COMPOSE_FILE + '.pytemplate', 'r') as template_file:
        with open(__DOCKER_COMPOSE_FILE, 'w') as compose_file:
            compose_template = template_file.read()
            compose_file.write(
                compose_template.format(
                    tag=__VARS['image_tag'],
                    ip=__VARS['api_ip'],
                    network=__VARS['api_network']
                )
            )


####################
# Helper functions #
####################

def _split_file_path_and_name(full_path):
    file_path = os.path.dirname(full_path)
    file_name = os.path.basename(full_path)
    return file_path, file_name


def _get_docker_env_vars():
    with open(os.path.join(__DOCKER_ENV_FILE), 'rb') as env_file:
        docker_env_vars = env_file.read()
    return docker_env_vars


def _check_for_secret_files():
    files_not_found = []

    if not os.path.exists(__DOCKER_ENV_FILE):
        files_not_found.append(__DOCKER_ENV_FILE)
    if not os.path.exists(__GCP_JSON_FILE):
        files_not_found.append(__GCP_JSON_FILE)

    for file_ in files_not_found:
        print(
            '  [ERROR] : Couldn\'t find "{}".'
            .format(file_)
        )

    if files_not_found:
        sys.exit(1)


#############################
# Create an argument parser #
#############################
def _get_argument_parser(command_coices):
    argparser = argparse.ArgumentParser()

    argparser.add_argument(
        'command',
        choices=command_coices
    )

    return argparser


########
# Main #
########
if __name__ == '__main__':
    if not os.path.exists(__DOCKER_ENV_FILE):
        print(__DOCKER_ENV_FILE)
        sys.exit(1)

    # Keys are arguments which can be used when calling 'python cloud.py <arg>'
    # Values are function-objects which will be called based on argument
    command_function_mapping = {
        'build-packer': build_packer,
        'push-docker': push_docker,
        'start-server': start_server,
        'compose-yml': compose_yml
    }

    # Parse and validate arguments
    argparser = _get_argument_parser(list(command_function_mapping))
    args = argparser.parse_args()

    # Run appropriate function
    command_function_mapping[args.command]()
