import axios from 'axios'
import { ROOT_API_URL } from "../settings/endpoints";
import { AsyncStorage } from "react-native";

const accessToken = AsyncStorage.getItem('access_token')

const http = axios.create({
    baseURL: ROOT_API_URL,
    timeout: 1000,
    headers: {}
});


export default http;


