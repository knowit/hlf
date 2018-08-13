import axios from 'axios'
import { ROOT_API_URL } from "../settings/endpoints";
import { AsyncStorage } from "react-native";

AsyncStorage.getItem('access_token').then((token) => {
    const authenticated = axios.create({
        baseURL: ROOT_API_URL,
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + token
        }
    });

    export default authenticated;
});