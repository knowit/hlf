import React, { Component } from "react";
import { View, AsyncStorage, StyleSheet, Platform } from "react-native";
import { AppButton } from "../components/AppButton";

import Auth0 from 'react-native-auth0';


const config = {
    domain: 'hlf-godlyd.eu.auth0.com',
    clientId: '3pAWoFhOFgb5o9hS121EVFT7Hwwvsa7p',
    audience: 'test-brukerinnlogging.hlf-godlyd.no',
    scope: 'openid profile offline_access'
};

const auth0 = new Auth0({ domain: config.domain, clientId: config.clientId });

export default class LoginScreen extends Component{

    constructor(props){
        super(props);
        this.creds = '';
    }

    render(){
        return <View>
            <AppButton onPress={() => this.login()}>
            Logg inn
        </AppButton>
        <AppButton onPress={() => this.printState()}>
            Print state
        </AppButton>
        </View>

    }

    printState(){
        AsyncStorage.getItem("access_token")
        .then(value =>
            console.log("access_token: "+value)
        ).done();
        AsyncStorage.getItem("id_token")
        .then(value =>
            console.log("id_token: "+value)
        ).done();
        AsyncStorage.getItem("refresh_token")
        .then(value =>
            console.log("refresh_token: "+value)
        ).done();
    }

    login(){
        this._authorize();
    }

    _authorize = async () => {        
    auth0
    .webAuth
    .authorize({scope: config.scope, audience: config.audience})
    .then(credentials =>
        this.saveCredentials(credentials)
    )
    .catch(error => console.log(error));

    }

    saveCredentials(credentials){
        AsyncStorage.setItem("access_token", credentials.accessToken)
        AsyncStorage.setItem("id_token", credentials.idToken)
        AsyncStorage.setItem("refresh_token", credentials.refreshToken)
    }

}