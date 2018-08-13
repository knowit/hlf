import React from "react";
const credentials = require("../settings/authConfig");
import Auth0 from "react-native-auth0";
const auth0 = new Auth0(credentials);
import { AsyncStorage } from "react-native";
import Loading from "../components/Loading";

export default ({ auth0Success }) => {
  console.log("LoginScreen created");
  auth0.webAuth
    .authorize({
      scope: credentials.scope,
      audience: credentials.audience
    })
    .then(credentials => {
      saveTokens(credentials);
      auth0Success();
    })
    .catch(error => console.log("error: ", error));
  return <Loading />;
};

const saveTokens = credentials => {
  AsyncStorage.setItem("access_token", credentials.accessToken);
  AsyncStorage.setItem("id_token", credentials.idToken);
  AsyncStorage.setItem("refresh_token", credentials.refreshToken);
};
