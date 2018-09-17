# Godlydpatruljen - Mobile App
Mobile application made with [React Native][react-native].

## Prerequisites
This project is _not_ using Expo, which means that all SDKs must be downloaded and installed locally. React Native's [getting started guide][react-native-getting-started] could be of help regarding setting up your project. When reading the guide, click on **Building Projects with Native Code** and choose **Development OS** and **Target OS** to get more detailed instructions.

Also, install [NodeJS][nodejs] with [NPM][npm]. NPM should be included when installing NodeJS.

## Setup
1. Change your current working directory to the app folder:  
`cd hlf/app`

2. Install dependencies from NPM  
`npm install`

3. Follow the steps in the [secrets handler README](../secrets_handler/README.md) to download `auth.json` (it should be saved in the `secrets` folder).

4. Use the Python script `app.py` to create credentials:  
`python app.py set-all-credentials`
    - This will create four files with the appropriate credentials:
        - `android/secrets.properties`
        - `ios/godlydapp/Key.m`
        - `settings/authConfig.js`
        - `credentials.js`
    - To only set one file at the time, the argument `set-all-credentials` can be changed to one of the following:
        - `set-properties`
        - `set-key`
        - `set-auth-config`
        - `set-credentials-js`

## Run in development environment
```bash
# Android
react-native run-android

# iOS
react-native run-ios

# To run with logging, use
react-native log-android
# or
react-native log-ios
```

## Build app
### Android
1. Change to `android` folder:  
`cd android`

1. Build with [Gradle][gradle]:  
`./gradlew assembleRelease`

The artifacts will be two `.apk` files, one for ARM and one for x86, which will be saved in `hlf/app/android/app/build/outputs/apk/release`.

### iOS
1. Log in to your [Apple Developer Account][apple-dev].
    - Double-check your app context.
    - Make sure that Xcode is logged in with the same account.

1. Open `/hlf/app/ios/godlydapp.xcodeworkspace` in Xcode.

1. Within Xcode, click on _**godlydapp**_ to view project information. Make sure that **Signing Team** is set to _"Hlf Hørselshemmedes Landsforbund"_.

1. Generate certificates with Xcode:
    - **Xcode Preferences** &gt; **Account** &gt; **Manage Certificates**
        - Generate certificates for _"Development"_ **and** _"Production / Distribution"_.
        - Open your web browser where you logged in to you Apple Developer Account.
        - In the left-hand menu, choose **Certificates, IDs &amp; Profiles**.
        - Your certificates should be stored under **Certificates** &gt; **Development / Production**

1. Build the app for a generic iOS device.

1. When building is complete, the application should be visible under **Product** &gt; **Archive**. It can now be uploaded to [**App Store Connect**][app-store-connect] (blue button), and will after a while be available at ASC.


[apple-dev]:                    https://developer.apple.com/account/
[app-store-connect]:            https://appstoreconnect.apple.com/
[gradle]:                       https://gradle.org/
[nodejs]:                       https://nodejs.org/en/
[npm]:                          https://www.npmjs.com/
[react-native]:                 https://facebook.github.io/react-native/
[react-native-getting-started]: https://facebook.github.io/react-native/docs/getting-started