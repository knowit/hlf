import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
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
            isAuthenticated: false,
            access_token: '',
            isMounted: false,
            isProcessing: true
        }
    }

    componentDidMount(){
        this.state.isMounted = true;
        this.setAuthenticated = this.props.setAuthenticated;
        this._getLocalToken();
    }
    componentWillUnmount(){
        this.state.isMounted = false;
    }

    render(){
        return !this.state.isProcessing ? (
        <View>
        <AppButton onPress={() => this.login()}>
            Logg inn
        </AppButton>
        </View>
        ):(
            <View>
                <AppText type="secondary" size="large">
                Loading
                </AppText>
            </View>
        )
    }

    login(){
        if(this.state.isMounted){
            this._authorize();
        }
    }

    _authorize = async () => {    
        if(this.state.isMounted){
            this.setState({isProcessing: true});
        }    
        auth0
        .webAuth
        .authorize({scope: config.scope, audience: config.audience})
        .then(credentials =>
            this._saveCredentials(credentials)
        )
        .catch(error => {
            console.log(error);
            if(this.state.isMounted){
                this.setState({
                    isProcessing: false,
                    isAuthenticated: false
            });
            }
        });
        }

    _getLocalToken = async () => {
        if(this.state.isMounted){
            this.setState({isProcessing:true});
        }
        AsyncStorage.getItem("access_token")
        .then(value =>
            this._checkTokenValidation(value)
        ).catch(error => {
            console.log(error);
            if(this.state.isMounted){
                this.setState({isProcessing: false, isAuthenticated: false});
            }
        });
    }

    _checkTokenValidation = async (token) => {

        // NOT FINISHED
        // This method should validate the access token with the API.
        // Requires communication with API endpoint.

        this.state.access_token = token;
        let auth = true;
        if(token == '' || token == null){
            auth = false;
        }

        this.state.isAuthenticated = auth;
        this.setAuthenticated(auth);

        if(!this.state.isAuthenticated){
            this._refreshToken();
        }
        return auth;
    }

    _refreshToken = async() =>{
        AsyncStorage.getItem("refresh_token")
        .then(value => {
            if(value != null && value != ''){
                auth0.auth.refreshToken({refreshToken: value, scope: config.scope})
            .then(credentials =>
                this._saveCredentials(credentials)
            )
            } else{
                this.state.isAuthenticated = false;
                if(this.state.isMounted){
                    this.setState({isProcessing: false});
                }
            }
        }
        ).catch(error => {
            console.log(error);
            if(this.state.isMounted){
                this.setState({isProcessing: false, isAuthenticated: false});
            }
        });
    }

    _saveCredentials = async (credentials) =>{
        if(this.state.isMounted){
            this.setState({isProcessing: true});
        }
        this._checkTokenValidation(credentials.accessToken).then(auth =>{
            if(auth){
                AsyncStorage.setItem("access_token", credentials.accessToken)
                AsyncStorage.setItem("id_token", credentials.idToken)
                AsyncStorage.setItem("refresh_token", credentials.refreshToken)
            }
        }).catch(error => {
            console.log(error);
            if(this.state.isMounted){
                this.setState({isProcessing: false, isAuthenticated: false});
            }
        });
    }
}