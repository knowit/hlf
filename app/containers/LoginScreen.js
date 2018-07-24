import React, { Component } from "react";
var credentials = require("../settings/authConfig");
import Auth0 from "react-native-auth0";
const auth0 = new Auth0(credentials);
import { View, AsyncStorage } from "react-native";
import SlimText from "../components/SlimText";

export default ({ setAuthenticated }) => {
  auth0.webAuth
    .authorize({
      scope: credentials.scope,
      audience: credentials.audience
    })
    .then(credentials => {
      saveTokens(credentials);
      setAuthenticated(true);
    })
    .catch(error => console.log(error));
  return (
    <View>
      <SlimText>Loading...</SlimText>
    </View>
  );
};

const saveTokens = credentials => {
  AsyncStorage.setItem("access_token", credentials.accessToken);
  AsyncStorage.setItem("id_token", credentials.idToken);
  AsyncStorage.setItem("refresh_token", credentials.refreshToken);
};
