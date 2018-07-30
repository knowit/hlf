import React, { Component } from "react";
var credentials = require("../settings/authConfig");
import Auth0 from "react-native-auth0";
const auth0 = new Auth0(credentials);
import { AsyncStorage } from "react-native";
import Loading from "../components/Loading";

export default ({ loginSuccessful }) => {
  auth0.webAuth
    .authorize({
      scope: credentials.scope,
      audience: credentials.audience
    })
    .then(credentials => {
      saveTokens(credentials);
      loginSuccessful();
    })
    .catch(error => error);
  return <Loading />;
};

const saveTokens = credentials => {
  AsyncStorage.setItem("access_token", credentials.accessToken);
  AsyncStorage.setItem("id_token", credentials.idToken);
  AsyncStorage.setItem("refresh_token", credentials.refreshToken);
};
