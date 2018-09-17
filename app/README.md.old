# Godlydpatruljen
Mobilapplikasjonen utviklet med React Native. 

## Forutsetninger 
Prosjektet bygger på Native kode (ikke Expo), hvilket betyr at SDK-er må lastes ned på utviklings-PC.
[Den offisielle dokumentasjonen](https://facebook.github.io/react-native/docs/getting-started) til React Native kan være behjelpelig med å komme i gang med dette. Velg __Building Projects with Native Code__. Sett så __Development OS__ og __Target OS__ for videre instruksjoner.

## Installasjon 
``` 
git clone https://github.com/knowit/hlf.git
cd hlf/app
npm install 
Opprett secrets ( se neste punkt ) 
```

## Secrets

### Android kode:

__android/secrets.properties__
```properties
googleMapsApiKey="google maps api key"
```

### iOS kode: 

ios/godlydapp/Key.h og ios/godlydapp/Key.m

__Key.h__
```objective-c
@interface Key
extern NSString *googleMapsApiKey;
@end
``` 
__Key.m__
```objective-c
NSString *googleMapsApiKey = @"google maps api key";
``` 

### React-Native kode: 

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

#### iOS

1. Logg inn på Apple Utvikler Konto og sørg for at du har satt riktig app som kontekst. 
2. Pass på at XCode er logget inn med samme utvikler konto. 
3. Åpne /hlf/app/ios/godlydapp.xcodeworkspace i XCod
4. I XCode sin meny trykk på "godlydapp" for å få opp informasjon om prosjektet. Pass på at Signing Team er satt til "Hlf Hørselshemmedes Landsforbund". 

5. Generer Sertifikater med Xcode: 
  * Xcode Preferences > Account > Manage Certificates (Generer både Development og Production/Distribution Sertifikater) 
  * Gå tilbake til nettleser der du var logget inn på Apple Utvikler konto. 
  * Velg "Certificates, IDs & Profiles" fra menyen til venstre. 
  * Se under "Certificates -> Development / Production" om dine sertifikater finnes der. 

6. Gå tilbake til Xcode og velg at bygging av app mot en generisk ios enhet. Trykk så på Product > Archive
7. Etter at applikasjonen har blitt bygget kan man laste den opp til App Store Connect ved å trykke på den blå knappen. 
8. Applikajsonen vil etterhvert da havne på https://appstoreconnect.apple.com/

## Todos
* Se issues
* Lage tester 
* Brukertesting m/ påfølgende arbeid
* Generell forbedring av kode og style
* Teste og bygge til IOS (krever Mac med Xcode + Iphone, og eventuelt en utviklerkonto)
