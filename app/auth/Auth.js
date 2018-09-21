import Auth0 from "react-native-auth0";
import authConfig  from '../settings/authConfig';
import store from '../store';

import {
    onAuth0Success,
    onAuth0Cancelled,
} from "../actions/account";

export default class Auth {
    static async login() {
        const auth0 = new Auth0(authConfig);

        try {
            const credentials = await auth0
                .webAuth
                .authorize({
                    scope: authConfig.scope,
                    audience: authConfig.audience
                });

            store.dispatch(onAuth0Success(credentials));
            return true;
        } catch(err) {
            console.log(err);
            if (err.error === "a0.session.user_cancelled") {
                onAuth0Cancelled();
            }
            return false;
        }
    };
}



