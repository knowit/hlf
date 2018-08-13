import http from './http';
import {AsyncStorage} from "react-native";

export default {

    checkOfflineStorage() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem("access_token").then(token => {
                resolve(token);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getAccountInformation() {
        return new Promise((resolve, reject) => {
            http.get('/brukere/login').then((user) => {
                resolve(user);
            }).catch(error => {
                reject(error);
            });
        });
    },

}
