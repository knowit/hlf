### Oppbygning av applikasjonen
Dette er en spring-boot applikasjon som bruker auth0 til innlogging.  

**Potensiell refakturering:**
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
