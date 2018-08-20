import axios from 'axios'
import { ROOT_API_URL } from "../settings/endpoints";

const http = axios.create({
    baseURL: ROOT_API_URL,
    timeout: 1000,
    headers: {}
});

export default http;