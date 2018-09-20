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
__PACKER_FILES_FOLDER = os.path.join(
    __PROJECT_ROOT,
    'cloud',
    'packer_files'
)
__DOCKER_COMPOSE_FILE = os.path.join(
    __PACKER_FILES_FOLDER,
    'docker-compose.yml'
)
__DOCKER_ENV_FILE = os.path.join(
    __PACKER_FILES_FOLDER,
    '.env'
)
__SECRET_FOLDER = os.path.join(
    __PROJECT_ROOT,
    'secrets'
)
__GCP_JSON_FILE = os.path.join(
    __SECRET_FOLDER,
    'gcp.json'
)
__AUTH_JSON_FILE = os.path.join(
    __SECRET_FOLDER,
    'auth.json'
)

__LOCAL_FOLDER = '/var/local'

with open(__GCP_JSON_FILE, 'r') as gcp_json_file:
    __GCP_VARS = json.load(gcp_json_file)

with open(__AUTH_JSON_FILE, 'r') as auth_json_file:
    __AUTH_VARS = json.load(auth_json_file)

with open(
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'], 'r'
) as credentials_json_file:
    __CREDENTIALS_VARS = json.load(credentials_json_file)


##############################
# Wrapper for 'packer build' #
##############################
def build_packer():
    packer_vars = {
        'contact_email': __GCP_VARS['contact_email'],
        'api_domain': __GCP_VARS['api_domain'],
        'https_proxy': __GCP_VARS['https_proxy'],
        'docker_image_tag': __GCP_VARS['image_tag'],
        'local_folder': __LOCAL_FOLDER
    }

    packer_run_command = ' '.join(
        ['packer build'] +
        [
            '-var "{}={}"'.format(key, value)
            for key, value
            in packer_vars.items()
        ] +
        ['packer.json']
    )

    os.system(packer_run_command)


#############################
# Wrapper for 'docker push' #
#############################
def push_docker():
    image_id = os.popen(
        'docker images -q {}'.format(__GCP_VARS['image_name'])
    ).read().replace('\n', '')

    commands = [
        # Use local credentials to authenticate
        'gcloud auth activate-service-account {} --key-file {}'.format(
            __CREDENTIALS_VARS['client_email'],
            os.environ['GOOGLE_APPLICATION_CREDENTIALS']
        ),

        'gcloud config set project {}'.format(
            __GCP_VARS['project']
        ),

        'gcloud auth configure-docker',

        'docker tag {} {}'.format(
            image_id, __GCP_VARS['image_tag']
        ),

        'docker push {}'.format(
            __GCP_VARS['image_tag']
        )
    ]

    for command in commands:
        os.system(command)


###################################
# Wrapper for 'docker-compose up' #
###################################
def start_server():
    docker_command = 'sudo docker-compose up -d -f {}/docker-compose.yml'\
        .format(__LOCAL_FOLDER)
    gcloud_command = 'gcloud compute ssh {}@{} --command="{}"'.format(
        __GCP_VARS['ssh_user'],
        __GCP_VARS['instance_name'],
        docker_command
    )

    print(
        'Attempting to ssh into {} and start the Docker container'
        .format(__GCP_VARS['instance_name'])
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
                    tag=__GCP_VARS['image_tag'],
                    ip=__GCP_VARS['api_ip'],
                    network=__GCP_VARS['api_network'],
                    local_folder=__LOCAL_FOLDER
                )
            )


##############################################
# Create an '.env' file for 'docker-compose' #
##############################################
def set_env():
    keys = [
        "postgres_db", "datasource_user", "datasource_password",
        "auth0_domain", "auth0_issuer", "auth0_token_url",
        "auth0_audience", "auth0_client_id", "auth0_client_secret",
        "auth0_management_audience", "auth0_management_client_id",
        "auth0_management_client_secret", "google_maps_api_key"
    ]
    with open(__DOCKER_ENV_FILE, 'w') as env_file:
        env_lines = [
            "{}={}".format(
                key.upper(),
                __AUTH_VARS[key]
            )
            for key in keys
        ]
        env_file.writelines(env_lines)


############################################
# Set both the '.yml' and the '.env' files #
############################################
def generate_both():
    compose_yml()
    set_env()


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
    files_to_check = [
        __DOCKER_ENV_FILE,
        __GCP_JSON_FILE,
        os.environ['GOOGLE_APPLICATION_CREDENTIALS']
    ]

    for file_ in files_to_check:
        if not os.path.exists(file_):
            files_not_found.append(file_)

    for file_ in files_not_found:
        print(
            '  [ERROR] : Couldn\'t find "{}".'
            .format(file_),
            file=sys.stderr
        )

    if files_not_found:
        sys.exit(1)


#############################
# Create an argument parser #
#############################
def _get_main_argument_parser(command_coices):
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
    _check_for_secret_files()

    # Keys are arguments which can be used when calling 'python cloud.py <arg>'
    # Values are function-objects which will be called based on argument
    command_function_mapping = {
        'build-packer': build_packer,
        'push-docker': push_docker,
        'start-server': start_server,
        'compose-yml': compose_yml,
        'set-env': set_env,
        'generate-both': generate_both
    }

    # Parse and validate arguments
    argparser = _get_main_argument_parser(list(command_function_mapping))
    args = argparser.parse_args()

    # Run appropriate function
    command_function_mapping[args.command]()
