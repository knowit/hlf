import http from './http';
import {AsyncStorage} from "react-native";

export default {

    async checkOfflineStorage() {
        return await AsyncStorage.getItem("access_token");
    },

    async getAccountInformation(token) {
        return await http.get('/brukere/login', { headers: {
            authorization: 'Bearer ' + token,
            }});
    },
}
