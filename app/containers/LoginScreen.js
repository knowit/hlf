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
        //AsyncStorage.clear();
        this.authenticate = true;
        this._getLocalToken();
        
    }

    render(){
        return this.authenticate ? ( <View>
            <AppButton onPress={() => this.login()}>
            Logg inn
        </AppButton>
        <AppButton onPress={() => this.printState()}>
            Print state
        </AppButton>
        </View>):
        (<View>
            <AppButton onPress={() => this.printState()}>
            Print state
            </AppButton>
            </View>)

    }

    printState(){
        console.log(this.access_token);
    }

    _getLocalToken = async () => {
        AsyncStorage.getItem("access_token")
        .then(value =>
            this.checkToken(value)
        ).done();
    }

    login(){
        this._authorize();
    }

    checkToken(token){
        this.access_token = token;
        this.checkAuthorization();
        if(this.authenticate){
            this.renewToken();
        }
    }

    renewToken(){
        AsyncStorage.getItem("refresh_token")
        .then(value =>
            this._refreshToken(value)
        ).done();
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

    _refreshToken = async(rToken) =>{
        if(rToken != null && rToken != ''){
            auth0.auth.refreshToken({refreshToken: rToken, scope: config.scope})
        .then(credentials =>
            this.saveCredentials(credentials)
        )
        }
        else{
            this.forceUpdate();
        }
    }

    checkAuthorization(){
        this.authenticate = !this.isAuthenticated(this.access_token);
        this.forceUpdate();
    }

    saveCredentials(credentials){
        this.access_token = credentials.accessToken;
        this.checkAuthorization();
        AsyncStorage.setItem("access_token", credentials.accessToken)
        AsyncStorage.setItem("id_token", credentials.idToken)
        AsyncStorage.setItem("refresh_token", credentials.refreshToken)
    }

    isAuthenticated(token){
        if(token == '' || token == null){
            return false;
        }
        else{
            // Check with api that token is authenticated
            return true;
        }
    }

}