import fetch from "node-fetch";
import base64 from 'base-64';
import dotenv from 'dotenv';
dotenv.config();
import { DateTime } from "luxon";

export default (new class SpotifyService {
    authPath = 'https://accounts.spotify.com';
    APIPath = 'https://api.spotify.com/v1';
    defaultHeaders = {
        'Content-Type': 'application/json'
    }
    defaultScopes = [
        'playlist-modify-public',
        'playlist-modify-private'
    ]
    accessToken;

    constructor() {
    }

    // retrieve Spotify access token for for public API authentication
    getAccessToken = async() => {
        // if no token is cached or existing token has expired
        if (!this.accessToken || DateTime.utc().toMillis() > this.accessToken.expiry) {
            this.accessToken = await this._getAccessToken(); // retrieve new access token
        }
        return this.accessToken.token;
    }

    _getAccessToken = async () => {
        console.log('Retrieving Spotify access token...');

        const credentials = base64.encode(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
        const { access_token, expires_in } = await this.request('POST', `${ this.authPath }/api/token`,
            { 'grant_type': 'client_credentials' },
          { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${credentials}` }).catch(console.error);

        console.log(`Spotify access token retrieved (${ access_token }).`);
        return {
            token: access_token,
            expiry: DateTime.utc().plus(expires_in * 1000).toMillis()
        }
    }

    getRefreshToken = async (code) => {
        const credentials = base64.encode(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
        const { refresh_token } = await this.request('POST', `${ this.authPath }/api/token`,
          { 'grant_type': 'authorization_code',
              'code': code,
              'redirect_uri': 'http://localhost:5000/callback'},
          { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${credentials}` }).catch(console.error);
        return refresh_token;
    }

    getRefreshTokenURL = () => {
        return `${this.authPath}/authorize?${this.encodeURL({
            'client_id': process.env.CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': 'http://localhost:5000/callback',
            'scope': this.defaultScopes.join(' '),
            'show_dialog': false
        })}`
    }

    // get available genre seeds (not sure if we will need this)
    getGenres = async () => {
        const { genres } = await this.request('GET', `${ this.APIPath }/recommendations/available-genre-seeds`).catch(console.error);
        return genres
    }

    // helper fetch request function
    request = async (method, path, data = null, headers = 'reserved_default') => {
        if (headers === 'reserved_default') {
            headers = { ...this.defaultHeaders, 'Authorization': `Bearer ${await this.getAccessToken()}` }
        }

        let body;
        if (data && headers) {
            body = this.encodeURL(data); // encode data as url
        } else if (data && !headers) {
            body = JSON.stringify(data); // stringify data
        }

        return new Promise(async (resolve, reject) => {
            fetch(`${path}`, { method: method, body, headers }).then(async response => {
                console.log(response);
                if (response.ok) {
                    resolve(await response.json());
                } else {
                    reject(await response.json());
                }
            }).catch(error => reject(error));
        });
    }

    encodeURL = (data) => {
        return Object.keys(data).map(k => `${k}=${ encodeURIComponent(data[k]) }`).join('&');
    }
});
