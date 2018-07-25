import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { AppButton } from "../components/AppButton";
import AppText from "../components/AppText";

import Auth0 from "react-native-auth0";
import { ROOT_API_URL } from "../settings/endpoints";

const auth0 = new Auth0({ domain: config.domain, clientId: config.clientId });

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      access_token: "",
      isMounted: false,
      isProcessing: true
    };
  }

  componentDidMount() {
    this.state.isMounted = true;
    this._getLocalToken();
  }
  componentWillUnmount() {
    this.state.isMounted = false;
  }

  render() {
    return !this.state.isProcessing ? (
      <View>
        <AppButton onPress={() => this.login()}>Logg inn</AppButton>
      </View>
    ) : (
      <View>
        <AppText type="secondary" size="large">
          Loading
        </AppText>
      </View>
    );
  }

  login() {
    if (this.state.isMounted) {
      this._authorize();
    }
  }

  _authorize = async () => {
    if (this.state.isMounted) {
      this.setState({ isProcessing: true });
    }
    auth0.webAuth
      .authorize({ scope: config.scope, audience: config.audience })
      .then(credentials => this._saveCredentials(credentials))
      .catch(error => {
        console.log(error);
        if (this.state.isMounted) {
          this.setState({
            isProcessing: false,
            isAuthenticated: false
          });
        }
      });
  };

  _getLocalToken = async () => {
    if (this.state.isMounted) {
      this.setState({ isProcessing: true });
    }
    AsyncStorage.getItem("access_token")
      .then(value => this._checkTokenValidation(value))
      .catch(error => {
        console.log(error);
        if (this.state.isMounted) {
          this.setState({ isProcessing: false, isAuthenticated: false });
        }
      });
  };

  _checkTokenValidation = async token => {
    if (token == "" || token == null) {
      this.state.isAuthenticated = false;
      //this.setAuthenticated(false);
      this.props.setAuthenticated(false);
      this._refreshToken();
      return false;
    }

    // FOR TESTING PURPOSES, ENTER YOUR LOCAL IP ADDRESS
    // MUST BE REPLACED WITH DOMAIN URL
    fetch(`${ROOT_API_URL}/brukere/login`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(response => {
        let auth = false;
        if (response.ok) {
          this.state.access_token = token;
          auth = true;
        }
        this.state.isAuthenticated = auth;
        this.props.setAuthenticated(auth);
        if (!auth) {
          this._refreshToken();
        }
        return auth;
      })
      .catch(error => {
        console.log(error);
        if (this.state.isMounted) {
          this.setState({ isProcessing: false, isAuthenticated: false });
          this.props.setAuthenticated(false);
        }
        return false;
      });
  };

  _refreshToken = async () => {
    AsyncStorage.getItem("refresh_token")
      .then(value => {
        if (value != null && value != "") {
          auth0.auth
            .refreshToken({ refreshToken: value, scope: config.scope })
            .then(credentials => this._saveCredentials(credentials));
        } else {
          this.state.isAuthenticated = false;
          if (this.state.isMounted) {
            this.setState({ isProcessing: false });
          }
        }
      })
      .catch(error => {
        console.log(error);
        if (this.state.isMounted) {
          this.setState({ isProcessing: false, isAuthenticated: false });
        }
      });
  };

  _saveCredentials = async credentials => {
    if (this.state.isMounted) {
      this.setState({ isProcessing: true });
    }
    this._checkTokenValidation(credentials.accessToken)
      .then(auth => {
        if (auth) {
          AsyncStorage.setItem("access_token", credentials.accessToken);
          console.log(credentials.accessToken);
          AsyncStorage.setItem("id_token", credentials.idToken);
          AsyncStorage.setItem("refresh_token", credentials.refreshToken);
        }
      })
      .catch(error => {
        console.log(error);
        if (this.state.isMounted) {
          this.setState({ isProcessing: false, isAuthenticated: false });
        }
      });
  };
}
