import http from '../Utils/HttpCommon';
import {SPOTIFY_TOKEN_URL, CLIENT_SECRET_BASE64} from "../constants/constants";

async function getToken(): Promise<object> {
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    const headers = {
        'Authorization': 'Basic ' + CLIENT_SECRET_BASE64,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return http.post(SPOTIFY_TOKEN_URL, params, {headers});
}


const TokenService = {
    getToken
};
export default TokenService;