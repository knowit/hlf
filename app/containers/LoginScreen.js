import React from "react";
const credentials = require("../settings/authConfig");
import Auth0 from "react-native-auth0";
const auth0 = new Auth0(credentials);
import Loading from "../components/Loading";

export default ({ auth0Success }) => {
  console.log("LoginScreen created");
  auth0.webAuth
    .authorize({
      scope: credentials.scope,
      audience: credentials.audience
    })
    .then(credentials => {
        console.log("LoginScreen - auth0 success");
      auth0Success(credentials);
    })
    .catch(error => console.log("error: ", error));
  return <Loading />;
};


