import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
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
        this.state={
            isAuthenticated: false,
            access_token: '',
            isMounted: true
        }
        this.setAuthenticated = this.props.setAuthenticated;
        this._getLocalToken();
    }

    componentWillUnmount(){
        this.state.isMounted = false;
    }

    render(){
        return <AppButton onPress={() => this.login()}>
            Logg inn
        </AppButton>
    }

    checkToken(token){
        this.state.access_token = token;
        this.checkAuthorization();
        if(!this.state.isAuthenticated){
            this.renewToken();
        }
    }

    renewToken(){
        AsyncStorage.getItem("refresh_token")
        .then(value =>
            this.checkRefreshToken(value)
        ).done();
    }

    checkRefreshToken(token){
        if((token == '' || token == null)&&this.state.isMounted){
            this.setState({isAuthenticated: false});
        }else{
            this._refreshToken(token);
        }
    }

    checkAuthorization(){
        this._checkTokenValidation().then(auth => {
            if(this.state.isMounted){
                this.state.isAuthenticated = auth;
                this.setAuthenticated(auth);
            }
        }
        );
    }

    saveCredentials(credentials){
        this.state.access_token = credentials.accessToken;
        this.checkAuthorization();
        AsyncStorage.setItem("access_token", credentials.accessToken)
        AsyncStorage.setItem("id_token", credentials.idToken)
        AsyncStorage.setItem("refresh_token", credentials.refreshToken)
    }

    login(){
        if(this.state.isMounted){
            this._authorize();
        }
    }

    _checkTokenValidation = async () => {
        const token = this.state.access_token;
        if(token == '' || token == null){
            return false;
        } else{
            return true;
        }
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

    _refreshToken = async(token) =>{
        if(token != null && token != ''){
            auth0.auth.refreshToken({refreshToken: token, scope: config.scope})
        .then(credentials =>
            this.saveCredentials(credentials)
        )
        } else{
            this.setState({isAuthenticated: false});
        }
    }

    _getLocalToken = async () => {
        AsyncStorage.getItem("access_token")
        .then(value =>
            this.checkToken(value)
        ).done();
    }
}