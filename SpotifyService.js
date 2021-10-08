import fetch, { Headers } from "node-fetch";
import base64 from 'base-64';
import dotenv from 'dotenv';
dotenv.config();
import { DateTime } from "luxon";

export default (new class SpotifyService {
    uri = 'https://accounts.spotify.com';
    defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    accessToken;

    constructor() {
        this.getAccessToken().then();
    }

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
        const { access_token, expires_in } = await this.POST('/api/token', {
            'grant_type': 'client_credentials'
        }, {
            'Authorization': `Basic ${credentials}`
        }).catch(console.error);
        console.log(`Spotify access token retrieved (${ access_token }).`);
        return {
            token: access_token,
            expiry: DateTime.utc().plus(expires_in * 1000).toMillis()
        }
    }


    POST = (endpoint, data, headers) => {
        const body = Object.keys(data).map(k => `${k}=${ data[k] }`).join('&'); // url encoding of data
        return new Promise((resolve, reject) => {
            fetch(`${ this.uri }${ endpoint }`, {
                method: 'POST',
                body,
                headers: new Headers({ ...headers, ...this.defaultHeaders }),
            }).then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(response.json());
                }
            }).catch(error => reject(error));
        });
    }
});
