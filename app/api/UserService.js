import http from './http';
import {AsyncStorage} from "react-native";

export default {

    getTokenFromStorage() {
      return new Promise((resolve, reject) => {
          AsyncStorage.getItem("access_token").then(token => {
              resolve(token);
          }, error => {
              reject(error);
          });
      });
    },

    setTokens(credentials) {
        return new Promise((resolve, reject) => {
            Promise.all([
                AsyncStorage.setItem("access_token", credentials.accessToken),
                AsyncStorage.setItem("id_token", credentials.idToken),
                AsyncStorage.setItem("refresh_token", credentials.refreshToken),
            ]).then(() => {
                resolve();
            }, error => {
                reject(error);
            });
        });
    },

    async checkOfflineStorage() {
        return await AsyncStorage.getItem("access_token");
    },

    async getAccountInformation(token) {
        return await http.get('/brukere/login', { headers: {
            authorization: 'Bearer ' + token,
            }});
    },
}
