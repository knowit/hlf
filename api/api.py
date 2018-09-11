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
__GCP_JSON_FILE = os.path.join(
    __PROJECT_ROOT_FOLDER,
    'secrets',
    'gcp.json'
)

with open(__GCP_JSON_FILE, 'r') as json_file:
    __VARS = json.load(json_file)


#############################
# Wrapper for 'mvn install' #
#############################
def build_maven():
    # Build .jar-file of the API
    maven_install_command = ' '.join([
        'mvn install dockerfile:build',
        '-Dmaven.test.skip=true',
        # '-Dspring.profiles.active=dev'
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
        'tag': __VARS['image_tag'],
        'nocache': True
    }
    # Build Docker image
    docker_client.images.build(**build_args)


# Run both build commands in correct sequence #
def build_both():
    build_maven()
    build_docker()


def _get_argument_parser(command_coices):
    argparser = argparse.ArgumentParser()

    argparser.add_argument(
        'command',
        choices=command_coices
    )

    return argparser


if __name__ == '__main__':
    command_function_mapping = {
        'build-docker': build_docker,
        'build-maven': build_maven,
        'build-both': build_both
    }

    argparser = _get_argument_parser(list(command_function_mapping))
    args = argparser.parse_args()

    command_function_mapping[args.command]()
