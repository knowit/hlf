import axios from 'axios'
import { ROOT_API_URL } from "../settings/endpoints";
import { AsyncStorage } from "react-native";

let authenticated = axios.create({
    baseURL: ROOT_API_URL,
    timeout: 1000,
});

authenticated.interceptors.request.use(
    async (config) => {
        config.headers.authorization = await AsyncStorage.getItem('access_token');
        return config;
    }, error => Promise.reject(error));

export default authenticated;