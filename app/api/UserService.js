import http from './http';
import { AsyncStorage } from "react-native";
import auth0 from './auth0';

export default {

    async setTokens(credentials) {

        console.log("access_token: ", credentials.accessToken);

        return await AsyncStorage.multiSet([
            ["access_token", credentials.accessToken],
            ["id_token", credentials.idToken],
            ["refresh_token", credentials.refreshToken]
        ]);
    },

    async getAccountInformation(token) {
        return await http.get('/brukere/login', { headers: {
            authorization: 'Bearer ' + token,
            }});
    },

    async signOut() {
        const signOutFromServer = auth0.get('/v2/logout');
        const removeTokens = AsyncStorage.multiRemove([
           'access_token',
           'id_token',
           'refresh_token'
        ]);

        await signOutFromServer;
        await removeTokens;

        return true;
    },

}
