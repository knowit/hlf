import argparse
import docker
import json
import os


__PROJECT_ROOT_FOLDER = os.path.dirname(os.path.dirname(
    os.path.abspath(os.path.realpath(__file__))
))
__API_FOLDER = os.path.join(
    __PROJECT_ROOT_FOLDER,
    'api'
)
__SECRETS_JSON_FILE = os.path.join(
    __PROJECT_ROOT_FOLDER,
    'secrets',
    'secrets.json'
)
__ENV = None
__SECRETS = None


#############################
# Wrapper for 'mvn install' #
#############################
def build_maven():
    # spring_flag = '-Dspring.profiles.active=dev'\
    #     if __ENV == 'dev'\
    #     else ''

    # Build .jar-file of the API
    maven_install_command = ' '.join([
        'mvn install dockerfile:build',
        '-Dmaven.test.skip=true',
        # spring_flag
    ])
    os.system(maven_install_command)


##############################
# Wrapper for 'docker build' #
##############################
def build_docker():
    # Get local Docker client
    docker_client = docker.from_env()
    # Set standard build arguments for this project
    build_args = {
        'path': __API_FOLDER,
        'tag': __SECRETS['image_tag'],
        'nocache': True
    }
    # Build Docker image
    docker_client.images.build(**build_args)


# Run both build commands in correct sequence #
def build_both():
    build_maven()
    build_docker()


####################
# Helper functions #
####################
def _get_argument_parser(command_coices):
    argparser = argparse.ArgumentParser()

    argparser.add_argument(
        'command',
        choices=command_coices
    )
    argparser.add_argument(
        '--dev',
        action='store_true'
    )

    return argparser


def _set_env(is_dev):
    global __ENV
    __ENV = 'dev' if is_dev else 'prod'


def _load_secrets():
    global __SECRETS
    with open(__SECRETS_JSON_FILE, 'r') as json_file:
        __SECRETS = json.load(json_file)[__ENV]


########
# Main #
########
if __name__ == '__main__':
    command_function_mapping = {
        'build-docker': build_docker,
        'build-maven': build_maven,
        'build': build_both
    }

    argparser = _get_argument_parser(list(command_function_mapping))
    args = argparser.parse_args()

    _set_env(args.dev)
    _load_secrets()

    command_function_mapping[args.command]()
