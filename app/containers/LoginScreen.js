/*
import React from "react";

const credentials = require("../settings/authConfig");
import Auth0 from "react-native-auth0";

const auth0 = new Auth0(credentials);

export function loginScreen() {
    auth0.webAuth
        .authorize({
            scope: credentials.scope,
            audience: credentials.audience
        })
        .then(credentials => {
            auth0Success(credentials);
        })
        .catch(error => {
            if (error.error === "a0.session.user_cancelled") {
                auth0Cancelled();
            }
        });
}*/
