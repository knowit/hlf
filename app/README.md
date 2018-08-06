# Godlydpatruljen
Mobilapplikasjonen utviklet med React Native. 

## Forutsetninger 
Prosjektet bygger på Native kode (ikke Expo), hvilket betyr at SDK-er må lastes ned på utviklings-PC.
[Den offisielle dokumentasjonen](https://facebook.github.io/react-native/docs/getting-started) til React Native kan være behjelpelig med å komme i gang med dette. Velg __Building Projects with Native Code__. Sett så __Development OS__ og __Target OS__ for videre instruksjoner.

### _!!! Applikasjonen er i skrivende stund ikke testet på IOS !!!_

## Installasjon 
``` 
git clone https://github.com/knowit/hlf.git
cd hlf/app
npm install 
Opprett secrets ( se neste punkt ) 
```

## Secrets
Prosjektet er avhengig av to secrets filer for å kjøre; settings/authConfig.js & app/credentials.js
__authConfig.js__
```javascript
module.exports = {
  domain: [SETT INN AUTH0 DOMENE],
  clientId: [SETT INN AUTH0 CLIENT ID],
  audience: [SETT INN AUTH0 AUDIENCE],
  scope: [SETT INN AUTH0 SCOPE]
};
``` 

__credentials.js__
```javascript
export const API_KEY = [google maps api key ]
```
Google Maps api key hentes fra Google Cloud Console

## Kjør i utviklingsmiljø
#### Android:
```
react-native run-android
For logging:
react-native log-android
```
#### IOS 
```
react-native run-ios
For logging:
react-native log-ios
```

## Bygg release versjon
#### Android
```
cd android
./gradlew assembleRelease
```
.apk (to ulike versjoner for ARM og x86) vil legge seg i app/android/app/build/outputs/apk/release

## Todos
* Se issues
* Lage tester 
* Brukertesting m/ påfølgende arbeid
* Generell forbedring av kode og style
* Teste og bygge til IOS (krever Mac med Xcode + Iphone, og eventuelt en utviklerkonto)
