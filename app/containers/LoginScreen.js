import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { AppButton } from "../components/AppButton";
import AppText from "../components/AppText";

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
        this.state={
            accessToken: '',
            idToken: '',
            refreshToken: ''
        }
    }

    render(){
        return <View>
            <AppButton onPress={() => this._authorize()}>
            Logg inn
        </AppButton>
        </View>

    }

    _authorize = async () => {        
    this.state.creds = await auth0
    .webAuth
    .authorize({scope: config.scope, audience: config.audience})
    .then(credentials =>
      console.log(credentials)
    )
    .catch(error => console.log(error));

    }
}