# Godlydpatruljen - API

## Setup
All basic setup is explained in the [root README](../README.md).

## Build Docker image

The final artifact of this build process is a Docker image, configured to start a .jar-file containing the API when a Docker container is launched from it. Only one command is needed to get this image:  
`python build_docker_image.py`

You can verify that the image has been built by calling `docker images` from the terminal. The output may show a list with multiple images, which is normal, but the one you are looking for should be named "_lydpatruljen/godlyd_".

### Docker build arguments
For the container to run properly, a set of arguments needs to be supplied. This can happen either when building the image _or_ when starting the container.  
The original build script injected these arguments into the image by retrieving encrypted secrets from a Google Cloud bucket and passing them in as build arguments.

Now, these arguments are injected into the container by `docker-compose` and are (as per now) no longer stored in a cloud bucket. _The build script retains the old functionality_, which can be activated by passing the `--gcs-build-args` flag, as so:  
`python build_docker_image.py --gcs-build-args`  
Remember that unless the runtime arguments are disabled (read the [API README](../cloud/README.md)) this flag will either do nothing, or worse, result in blank arguments.


## Build and run locally
1. Start a local PostgreSQL database with the name "_godlyd_" with a user and a password.
1. Create two environment variables:
    1. Let `DATASOURCE_USER` have the value of your database username.
    1. Let `DATASOURCE_PASSWORD` have the value of your database password.
1. The field `spring.datasource.url` in the [application-dev.properties](src/main/resources/application-dev.properties) file contains the IP-address to the database. Replace the IP with "_localhost_".
    - The database user and password can also be set here as an alternative to creating environment variables.
1. Run `mvn spring-boot:run` from the terminal. The API application will be built and run.


### Hvordan bygge/kjøre?
**Hvordan kjøre Spring boot applikasjonen lokalt med lokal database?**
1. Sørg for at datasource-urlen i application.properties fila bruker localhost.
2. Ha en postgresql database med navn "godlyd" opprettet lokalt, samt en bruker "hlf" med passord "hlf123" (MERK: passordet skal endres
til å bli kryptert etter hvert)
3. Kjør `mvn spring-boot:run`. Applikasjonen bygges og kjøres.

**Hvordan opprette docker image av applikasjonen?**
1. Bytt ut "localhost" i datasource-urlen til IP-adressen til databaseinstansen du ønsker å bruke i google cloud.
Om dette skal funke må ip-adressen din være autorisert for tilgang til databasen. Om du sitter på kontoret kan dette gjøres ved å
legge til 213.236.148.83 (knowit) under autorisasjon i consolen. Dette kan legges til for databaseinstansen,
MEN skal ikke være der når prosjektet skal i produksjon, så husk å slett den.
2. Skaff en access token til Google Cloud Platform, dette kan gjøres slik:
    - Gå inn på konsollen til Google Cloud Platform gjennom nettleseren din, og kjør Google Cloud shell
    - Kjør kommandoen 'gcloud auth print-access-token'

3. Lag en tekstfil inne i hlf/api og kall den 'gc_auth.txt'. Lim inn access tokenet, og pass på at den kun står på én linje.
4. Fra mappen hlf/api, kjør kommandoen    'python build.py'

  NB: Dersom build.py gir følgende feil,
  File "build.py", line 33, in <module>
  secrets = json.loads(bytes.decode(base64.b64decode(dec)))
  UnicodeDecodeError: 'utf-8' codec can't decode byte 0x87 in position 1: invalid start byte
  da er access_tokenet ditt utløpt, og du må generere en ny token.


Dersom det er ønskelig å bruke den lokale databasen på din egen pc, finn ip-adressen din og legg inn den i stedet for ip-adressen
til databaseinstansen. Husk her å endre din egen postgres konfigurasjon til å godta tilkobling fra alle ip adresser
([https://stackoverflow.com/questions/3278379/how-to-configure-postgresql-to-accept-all-incoming-connections](url)).


### Hvordan oppdatere secrets
1. Gå inn på Google Cloud Platform og åpne prosjektet. Åpne Cloud shell.
2. Kjør 'echo -n "{\"auth0ClientSecret\":\"{SECRET}\",\"auth0ManagementClientSecret\":\"{SECRET}\",\"datasourcePassword\":\"{SECRET}\"}" | base64' og kopier responsen.
3. Kjør 'curl -s -X POST "https://cloudkms.googleapis.com/v1/projects/godlydpatruljen/locations/global/keyRings/storage/cryptoKeys/mainKey:encrypt" -d "{\"plaintext\":\"{KOPIERT_TEKST}\"}" -H "Authorization:Bearer $(gcloud auth print-access-token)" -H "Content-Type:application/json"'.
4. Du vil få en respons av typen json. Kopier innholdet i feltet "ciphertext" og lim inn i en fil kalt secrets.encrypted.txt.
5. Gå inn på Google Cloud Storage og slett filen med samme navn og last den opp på nytt.


## Potensiell refakturering
- getVurderingerByPlaceId(String placeId, Pagable pagable) i VurderingServiceImpl:
Denne metoden er nok ikke gjort på den peneste og mest effektive måten slik som den er nå, men den funker.
Dersom det er tid, gjerne se litt på denne og prøv å skriv litt penere kode. Kort fortalt henter den en liste med vurderinger (paginering),
og deler denne lista opp i flere lister med kriteriet om at bruker og dato skal være den samme for alle elementer i hver liste. Videre blir
en JSON formattert, slik at output blir følgende:
```
[
{
    "dato": "2018-07-18",
    "registrator": 2, (eller hele objectet)
    "vurderinger": {
       "teleslynge": {"kommentar": "Noe", "rangering": true},
       "lydforhold": {"kommentar": "Noe annet", "rangering": false},
       ...
     }
},
{
    "dato": "2018-07-17",
    "registrator": 3,
    ...
},
...
]
```

- Finne ut om det er mulig med dynamiske queries i repoene. Jeg fant ingen god måte å gjøre dette på så nå er det fire ulike spørringer
i VurderingRepo (findXXXByPlaceId). Fint om de kan bli én spørring som er dynamisk (tror ikke dette er mulig med @Query da...)

- Gå gjennom pom.xml filen og ta vekk det som ikke trenger å være der. Jeg tror det er en del der nå som ikke er nødvendig for
applikasjonen slik den er nå.

- En del av testene ble slettet etter Bruker ble endret. Fint om noen nye tester kan skrives her.