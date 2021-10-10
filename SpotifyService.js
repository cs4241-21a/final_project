import fetch, { Headers } from "node-fetch";
import base64 from 'base-64';
import dotenv from 'dotenv';
dotenv.config();
import { DateTime } from "luxon";

export default (new class SpotifyService {
    authPath = 'https://accounts.spotify.com';
    APIPath = 'https://api.spotify.com/v1';
    defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    accessToken;

    constructor() {
        this.getGenres().then();
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
            { 'Authorization': `Basic ${credentials}` },
            { 'grant_type': 'client_credentials' }).catch(console.error);

        console.log(`Spotify access token retrieved (${ access_token }).`);
        return {
            token: access_token,
            expiry: DateTime.utc().plus(expires_in * 1000).toMillis()
        }
    }

    // get available genre seeds
    getGenres = async () => {
        const { genres } = await this.request('GET', `${ this.APIPath }/recommendations/available-genre-seeds`,
            { 'Authorization': `Bearer ${ await this.getAccessToken() }` }).catch(console.error);
        return genres
    }

    request = (method, path, headers, data=null) => {
        const body = data ? Object.keys(data).map(k => `${k}=${ data[k] }`).join('&') : null; // url encoding of data
        return new Promise((resolve, reject) => {
            fetch(`${ path }`, {
                method: method,
                body,
                headers: new Headers({ ...headers, ...this.defaultHeaders }),
            }).then(response => {
                console.log(response);
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(response.json());
                }
            }).catch(error => reject(error));
        });
    }
});
