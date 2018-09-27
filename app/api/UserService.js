import http from './http';
import { AsyncStorage } from "react-native";
import auth0 from './auth0';
import authenticated from './authenticated';

export default {

    async setTokens(credentials) {
        return await AsyncStorage.multiSet([
            ["access_token", credentials.accessToken],
            ["id_token", credentials.idToken],
            ["refresh_token", credentials.refreshToken]
        ]);
    },

    async getAccountInformation(token) {
        const data = {};
        const headers = { 'headers': { Authorization: 'Bearer ' + token } };
        const result = await http.post('/session', data, headers);
        return result;
    },

    async signOut() {
        const singOutFromAPI = authenticated.delete('/session');
        const signOutFromAuth0 = auth0.get('/v2/logout');
        const removeTokens = this.removeTokens();

        await singOutFromAPI;
        await signOutFromAuth0;
        await removeTokens;

        return true;
    },

    async deleteMyAccount() {
        return authenticated.delete('/brukere/min-konto');
    },

    async removeTokens() {
        return AsyncStorage.multiRemove([
            'access_token',
            'id_token',
            'refresh_token'
        ]);
    }

}
