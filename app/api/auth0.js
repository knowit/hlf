import axios from 'axios'
const credentials = require("../settings/authConfig");

let auth0 = axios.create({
    baseURL: 'https://' + credentials.domain,
    timeout: 1000,
});

export default auth0;
