# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="maria.jensen@knowit.no"

ARG DATASOURCEPASSWORD
ARG AUTH0CLIENTSECRET
ARG AUTH0MANAGEMENTCLIENTSECRET

ENV DATASOURCE_PASSWORD=$DATASOURCEPASSWORD AUTH0_CLIENT_SECRET=$AUTH0CLIENTSECRET AUTH0_MANAGEMENT_CLIENT_SECRET=$AUTH0MANAGEMENTCLIENTSECRET
ENV DATASOURCE_USER="hlf" POSTGRES_DB="godlyd"
ENV AUTH0_DOMAIN="godlydpatruljen.eu.auth0.com" AUTH0_ISSUER="https://godlydpatruljen.eu.auth0.com/" AUTH0_TOKEN_URL="https://godlydpatruljen.eu.auth0.com/oauth/token"
ENV AUTH0_CLIENT_ID="e0smYR6JB35rNEaCAZw5vE3EHzd4mPCa" AUTH0_AUDIENCE="https://dev.api.godlydpatruljen.no/"
ENV AUTH0_MANAGEMENT_CLIENT_ID="FVB9lZLmvR8KqezPEwMvZQ4VgyLut7nM" AUTH0_MANAGEMENT_AUDIENCE="https://godlydpatruljen.eu.auth0.com/api/v2/"


# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file
ARG JAR_FILE=target/godlyd-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
ADD ${JAR_FILE} godlyd.jar

#ADD target/lib

# Run the jar file
ENTRYPOINT [ "java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/godlyd.jar" ]