# Godlydpatruljen - API

## General
**Note:**  
* All commands are run with `hlf/api` as the current working directory, unless otherwise specified.
* All files and folders assume `hlf/api` as root, unless otherwise specified.

## Setup
Follow the setup steps in the [root README](../README.md).

## Build Docker image
The final artifact of this build process is a Docker image, configured to start a `.jar` file containing the API when a Docker container is launched from it. Only one command is needed to get this image:  
`python api.py build`

This command will use Maven to build the API `.jar` file, and then build a Docker image containing this `.jar`.

You can verify that the image has been built by calling `docker images` from the terminal. The output may show a list with multiple images, which is normal, but the one you are looking for should be named "_lydpatruljen/godlyd_".

### Separate building
If you want to build a Docker image without building a new `.jar` first, or if you _only_ want to build a `.jar`, then you can use  
`python api.py build-docker`   
or  
`python api.py build-maven`  
to do this.


## Build and run locally
1. Start a local PostgreSQL database with the name "_godlyd_" with a user and a password.
1. Create two environment variables:
    1. Let `DATASOURCE_USER` have the value of your database username.
    1. Let `DATASOURCE_PASSWORD` have the value of your database password.
1. The field `spring.datasource.url` in the [application-dev.properties][app-dev-prop] file contains the IP-address to the database. Replace the IP with "_localhost_".
    - The database user and password can also be set here as an alternative to creating environment variables.
1. Run `mvn spring-boot:run` from the terminal. The API application will be built and run.

## Use global API with local database
1. The field `spring.datasource.url` in the [application-dev.properties][app-dev-prop] file contains the IP-address to the database. Replace the IP with your machine's IP address.
1. Change your PostgreSQL configuration to accept connections [from all IPs][so-psql-all-connections].



[app-dev-prop]:             src/main/resources/application-dev.properties
[so-psql-all-connections]:  https://stackoverflow.com/questions/3278379/how-to-configure-postgresql-to-accept-all-incoming-connections
