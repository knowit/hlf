import axios from 'axios'
import { ROOT_API_URL } from "../settings/endpoints";
import { AsyncStorage } from "react-native";
import auth0 from "./auth0";
const credentials = require("../settings/authConfig");

let authenticated = axios.create({
    baseURL: ROOT_API_URL,
    timeout: 10000
});

authenticated.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("access_token");
        config.headers.authorization = "Bearer " + token;
        return config;
    }, error => Promise.reject(error));

authenticated.interceptors.response.use((response) => {
        return response;
    }, async error => {

    const originalRequest = error.config;

    if((error.response && error.response.status === 408) || (error.code && error.code === 'ECONNABORTED')) {
        return Promise.reject(error);
    }
    else if((error.response && error.response.status !== 401) || originalRequest._retry) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = await AsyncStorage.getItem('refresh_token');

    if(!refreshToken) {
        return Promise.reject(error);
    }

    const data = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: credentials.clientId
    };

    // Refresh Token at Auth0
    const result = await auth0.post('oauth/token', data);
    if(result.status !== 200) {
        return Promise.reject(error);
    }

    const refreshedTokens = result.data;
    auth0.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedTokens.access_token;
    authenticated.defaults.headers.common['Authorization'] = 'Bearer ' + refreshedTokens.access_token;
    originalRequest.headers['Authorization'] = 'Bearer ' + refreshedTokens.access_token;
    await AsyncStorage.setItem('access_token', refreshedTokens.access_token);

    return authenticated.request(originalRequest);
});

export default authenticated;