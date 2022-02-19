import http from '../Utils/HttpCommon';
import {API_BASE_URL, SPOTIFY_TOKEN_URL, CLIENT_SECRET_BASE64} from "../constants/constants";
import {encodeQueryData} from "../Utils/AddQueryParams";
const Cookies = require('js-cookie');


async function getSpotifyPlaylist(params: Object): Promise<object> {
    const token = Cookies.get('access_token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    const url = `${API_BASE_URL}browse/featured-playlists${params ? `?${encodeQueryData(params)}` : ''}`
    return http.get(url, {headers});
}


const SpotifyService = {
    getSpotifyPlaylist
};
export default SpotifyService;