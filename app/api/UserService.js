import http from './http';
import { AsyncStorage } from "react-native";
import axios from 'axios';
const credentials = require("../settings/authConfig");

export default {

    async getTokenFromStorage() {
        return await AsyncStorage.getItem("access_token");
    },

    async setTokens(credentials) {
        return await AsyncStorage.multiSet([
            ["access_token", credentials.accessToken],
            ["id_token", credentials.idToken],
            ["refresh_token", credentials.refreshToken]
        ]);
    },

    async getRefreshToken() {
      return await AsyncStorage.getItem("refresh_token");
    },

    async getAccountInformation(token) {
        return await http.get('/brukere/login', { headers: {
            authorization: 'Bearer ' + token,
            }});
    },

    async signOut() {
        const auth0 = axios.get('https://' + credentials.domain + '/v2/logout');
        const asyncStorage = AsyncStorage.multiRemove([
           'access_token',
           'id_token',
           'refresh_token'
        ]);

        await auth0;
        await asyncStorage;

        return true;
    }
}
