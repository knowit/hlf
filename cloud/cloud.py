import argparse
from datetime import datetime
import json
import os
import requests
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
__DOCKER_ENV_NAME = 'godlyd_api.env'
__DOCKER_ENV_FILE = os.path.join(
    __PACKER_FILES_FOLDER,
    __DOCKER_ENV_NAME
)
__SECRETS_JSON_FILE = os.path.join(
    __PROJECT_ROOT,
    'secrets',
    'secrets.json'
)

# Folder on server in which to store scripts and (some) configs
__LOCAL_FOLDER = '/var/local'

#################################################################
# Open JSON formatted secrets and import as Python Dictionaries #
#################################################################
__ENV = None
__SECRETS = None
__CREDENTIALS = None


##############################
# Wrapper for 'packer build' #
##############################
def build_packer():
    # Get key/value pairs needed for 'packer build'
    packer_vars = {
        'ssh_user': __SECRETS['ssh_user'],
        'contact_email': __SECRETS['contact_email'],
        'api_domain': __SECRETS['api_domain'],
        'https_proxy': __SECRETS['https_proxy'],
        'docker_image_tag': __SECRETS['image_tag'],
        'local_folder': __LOCAL_FOLDER,
        'env': __ENV
    }

    # Prepare build command
    packer_run_command = ' '.join(
        ['packer build'] +
        [
            '-var "{}={}"'.format(key, value)
            for key, value
            in packer_vars.items()
        ] +
        ['packer.json']
    )

    # Rewrite .yml and .env, just in case
    generate_both()

    # Build
    os.system(packer_run_command)


#############################
# Wrapper for 'docker push' #
#############################
def push_docker():
    # Get correct image ID from local Docker daemon
    image_id = os.popen(
        'docker images -q {}'.format(__SECRETS['image_name'])
    ).read().replace('\n', '')

    commands = [
        # Use local credentials to authenticate
        'gcloud auth activate-service-account {} --key-file {}'.format(
            __CREDENTIALS['client_email'],
            os.environ['GOOGLE_APPLICATION_CREDENTIALS']
        ),

        'gcloud config set project {}'.format(
            __SECRETS['project']
        ),

        'gcloud auth configure-docker',

        'docker tag {} {}'.format(
            image_id, __SECRETS['image_tag']
        ),

        'docker push {}'.format(
            __SECRETS['image_tag']
        )
    ]

    for command in commands:
        # Execute command
        completed_process = subprocess.run(
            command,
            shell=True
        )
        # Validate the execution, and exit if errors are found
        if completed_process.returncode != 0:
            print(
                '[ERROR]',
                'Command "{}" returned a non-zero exit code.'.format(command),
                'Exiting...',
                sep='\n',
                file=sys.stderr
            )
            sys.exit(1)


###################################
# Wrapper for 'docker-compose up' #
###################################
def start_api():
    # Prepare command for docker-compose
    docker_command = 'sudo docker-compose -f {}/docker-compose.yml up -d'\
        .format(__LOCAL_FOLDER)

    # Prepare command for gcloud
    # to relay the docker command to server instance
    gcloud_command = 'gcloud compute ssh {}@{} --command="{}"'.format(
        __SECRETS['ssh_user'],
        __SECRETS['instance_name'],
        docker_command
    )

    print(
        'Attempting to ssh into {} and start the Docker container'
        .format(__SECRETS['instance_name'])
    )

    # Try N times to start the API
    max_attempts = 3  # N
    wait_length = 3  # seconds
    for i in range(1, max_attempts + 1):
        print('Attempt {}/{}\nWaiting...'.format(i, max_attempts))
        completed_process = subprocess.run(
            gcloud_command,
            shell=True
        )
        # Assume that SSH connection error is the only possible error
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

    # Prepare healthcheck URL
    healthcheck_url = 'http://{}/healthcheck'.format(__SECRETS['api_domain'])
    # 6 * 10 = 60 seconds
    # API should start in ~40 seconds
    max_attempts = 6
    wait_length = 7  # seconds

    print('Waiting for API to start...')
    print('(This takes at least 20 seconds...)')
    sleep(20)

    print('Trying to reach {}'.format(healthcheck_url))
    for i in range(1, max_attempts + 1):
        print('Attempt {}/{}'.format(
            i, max_attempts
        ))
        try:
            response = requests.get(healthcheck_url, timeout=wait_length)
            if response.status_code == 200:
                print('{} returned "200 OK"'.format(healthcheck_url))
                sys.exit(0)  # Everything is fine
            else:
                # Most likely 502
                # i.e. the instance is running,
                # but the API has not started yet
                print(
                    '{} returned status code {}'.format(
                        healthcheck_url,
                        response.status_code
                    )
                )
                print('Waiting {} seconds...'.format(wait_length))
                if i < max_attempts:
                    sleep(wait_length)
        except requests.exceptions.ReadTimeout as e:
            print(
                'Timeout after {} seconds.\n'.format(wait_length),
                file=sys.stderr
            )

    # Should exit before this point
    print(
        'Could not get a "200 OK" from {}'.format(healthcheck_url),
        file=sys.stderr
    )
    print(
        'Perhaps you should manually check your server?',
        file=sys.stderr
    )


####################################################
# Create a configuration file for 'docker-compose' #
####################################################
def compose_yml():
    with open(__DOCKER_COMPOSE_FILE + '.pytemplate', 'r') as template_file:
        with open(__DOCKER_COMPOSE_FILE, 'w') as compose_file:
            compose_template = template_file.read()
            compose_file.write(
                compose_template.format(
                    tag=__SECRETS['image_tag'],
                    ip=__SECRETS['api_ip'],
                    network=__SECRETS['api_network'],
                    env_file_path='{}/{}'.format(
                        __LOCAL_FOLDER,
                        __DOCKER_ENV_NAME
                    ),
                    env=__ENV
                )
            )


##############################################
# Create an '.env' file for 'docker-compose' #
##############################################
def set_env():
    keys = [
        "postgres_ip",
        "postgres_db", "datasource_user", "datasource_password",
        "auth0_domain", "auth0_issuer", "auth0_token_url",
        "auth0_audience", "auth0_client_id", "auth0_client_secret",
        "auth0_management_audience", "auth0_management_client_id",
        "auth0_management_client_secret", "google_maps_api_key"
    ]
    with open(__DOCKER_ENV_FILE, 'w') as env_file:
        env_lines = [
            "{}={}\n".format(
                key.upper(),
                __SECRETS[key]
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


#####################################
# Print certificate names to stdout #
#####################################
def get_latest_certificate_name(latest):
    gcloud_command = \
        'gcloud compute ssl-certificates list --format=json'

    completed_process = subprocess.run(
        gcloud_command,
        shell=True,
        stdout=subprocess.PIPE
    )

    if completed_process.returncode != 0:
        print(
            '[ERROR]',
            file=sys.stderr
        )
        sys.exit(1)

    certificates = json.loads(completed_process.stdout)
    certs_with_datetime = [
        (cert, _get_datetime_from_google_certificate(cert))
        for cert in certificates
    ]
    sorted_certs_with_datetime = sorted(
        certs_with_datetime,
        key=lambda x: x[1],
        reverse=True
    )

    if latest:
        print('Name of last certificate to be generated:')
        print(sorted_certs_with_datetime[0][0]['name'])
    else:
        print('Names of all certificates, newest first:')
        for i, cert in enumerate(sorted_certs_with_datetime, 1):
            name = cert[0]['name']
            print('  [{}]: {}'.format(i, name))


####################
# Helper functions #
####################

def _split_file_path_and_name(full_path):
    file_path = os.path.dirname(full_path)
    file_name = os.path.basename(full_path)
    return file_path, file_name


def _check_for_secret_files():
    files_not_found = []
    files_to_check = [
        __DOCKER_ENV_FILE,
        __SECRETS_JSON_FILE,
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


def _append_env_to_file_path(file_path, env):
    file_, ext = os.path.splitext(file_path)
    return '{}-{}{}'.format(
        file_, env, ext
    )


def _set_env(is_dev):
    global __ENV
    __ENV = 'dev' if is_dev else 'prod'


def _load_secrets():
    global __SECRETS
    global __CREDENTIALS

    with open(__SECRETS_JSON_FILE, 'r') as secrets_json_file:
        __SECRETS = json.load(secrets_json_file)[__ENV]

    with open(os.environ['GOOGLE_APPLICATION_CREDENTIALS'], 'r')\
            as credentials_json_file:
        __CREDENTIALS = json.load(credentials_json_file)


def _get_time_dict(google_timestamp):
    # Format: yyyy-MM-ddThh:mm:ss.xxx-yy:zz
    time_list = [
        int(x) for x in
        google_timestamp
        .replace(':', ' ')
        .replace('-', ' ')
        .replace('.', ' ')
        .replace('T', ' ')
        .split()
    ]

    time_dict = {
        'year': time_list[0],
        'month': time_list[1],
        'day': time_list[2],
        'hour': time_list[3],
        'minute': time_list[4],
        'second': time_list[5],
        'microsecond': time_list[6]
    }

    return time_dict


def _get_datetime_from_google_certificate(cert):
    timestamp = cert['creationTimestamp']
    time_dict = _get_time_dict(timestamp)
    datetime_object = datetime(**time_dict)

    return datetime_object


#############################
# Create an argument parser #
#############################
def _get_main_argument_parser(command_coices):
    argparser = argparse.ArgumentParser()

    argparser.add_argument(
        'command',
        choices=command_coices
    )
    argparser.add_argument(
        '--dev',
        action='store_true'
    )
    argparser.add_argument(
        '--latest',
        action='store_true'
    )

    return argparser


########
# Main #
########
if __name__ == '__main__':
    # Keys are arguments which can be used when calling 'python cloud.py <arg>'
    # Values are function-objects which will be called based on argument
    command_function_mapping = {
        'build-packer': build_packer,
        'push-docker': push_docker,
        'start-api': start_api,
        'compose-yml': compose_yml,
        'set-env': set_env,
        'generate-both': generate_both,
        'list-certificates': get_latest_certificate_name
    }

    # Parse and validate arguments
    argparser = _get_main_argument_parser(list(command_function_mapping))
    args = argparser.parse_args()

    if args.command not in ['compose-yml', 'set-env', 'generate-both']:
        _check_for_secret_files()
    _set_env(args.dev)
    _load_secrets()

    # Run appropriate function
    if args.command == 'list-certificates':
        command_function_mapping[args.command](args.latest)
    else:
        command_function_mapping[args.command]()
