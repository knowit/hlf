import argparse
import json
import os


###########################################################
# File locations relative to this script and project root #
###########################################################
__PROJECT_ROOT = os.path.dirname(os.path.dirname(
    os.path.abspath(os.path.realpath(__file__))
))
__APP_FOLDER = os.path.join(
    __PROJECT_ROOT,
    'app'
)
__PROPERTIES_FILE = os.path.join(
    __APP_FOLDER,
    'android',
    'secrets.properties'
)
__KEY_FILE = os.path.join(
    __APP_FOLDER,
    'ios',
    'godlydapp',
    'Key.m'
)
__AUTH_CONFIG_FILE = os.path.join(
    __APP_FOLDER,
    'settings',
    'authConfig.js'
)
__CREDENTIALS_JS_FILE = os.path.join(
    __APP_FOLDER,
    'credentials.js'
)
__AUTH_JSON_FILE = os.path.join(
    __PROJECT_ROOT,
    'secrets',
    'auth.json'
)

with open(__AUTH_JSON_FILE, 'r') as auth_json_file:
    __AUTH_VARS = json.load(auth_json_file)


######################################################
# Functions to create files for required credentials #
######################################################

def set_properties():
    with open(__PROPERTIES_FILE, 'w') as properties_file:
        properties_file.write(
            'googleMapsApiKey="{}"\n'.format(
                __AUTH_VARS['google_maps_api_key']
            )
        )


def set_key():
    with open(__KEY_FILE, 'w') as key_file:
        key_file.write(
            'NSString *googleMapsApiKey = @"{}";\n'.format(
                __AUTH_VARS['google_maps_api_key']
            )
        )


def set_auth_config():
    config_template_lines = [
        'const authConfig = {',
        '  domain: "{}",'.format(__AUTH_VARS['auth0_domain']),
        '  clientId: "{}",'.format(__AUTH_VARS['auth0_client_id']),
        '  audience: "{}",'.format(__AUTH_VARS['auth0_audience']),
        '  scope: "{}"'.format(__AUTH_VARS['auth0_scope']),
        '};',
        '\nexport default authConfig;'
    ]
    with open(__AUTH_CONFIG_FILE, 'w') as auth_config_file:
        auth_config_file.writelines(config_template_lines)


def set_credentials_js():
    with open(__CREDENTIALS_JS_FILE, 'w') as credential_js_file:
        credential_js_file.write(
            'export const API_KEY = "{}"'.format(
                __AUTH_VARS['google_maps_api_key']
            )
        )


def set_all_credentials():
    set_properties()
    set_key()
    set_auth_config()
    set_credentials_js()


#############################
# Create an argument parser #
#############################
def _get_argument_parser(commands):
    argparser = argparse.ArgumentParser()
    argparser.add_argument(
        'command',
        choices=commands
    )
    return argparser


########
# Main #
########
if __name__ == '__main__':
    command_function_mapping = {
        'set-properties': set_properties,
        'set-key': set_key,
        'set-auth-config': set_auth_config,
        'set-credentials-js': set_credentials_js,
        'set-all-credentials': set_all_credentials
    }

    argparser = _get_argument_parser(list(command_function_mapping))
    args = argparser.parse_args()

    command_function_mapping[args.command]()
