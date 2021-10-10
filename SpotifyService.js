import fetch from "node-fetch";
import base64 from 'base-64';
import dotenv from 'dotenv';
dotenv.config();
import { DateTime } from "luxon";

export default (new class SpotifyService {
    authPath = 'https://accounts.spotify.com';
    APIPath = 'https://api.spotify.com/v1';
    defaultScopes = [
        'playlist-modify-public'
    ]
    credentials = base64.encode(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    accessToken;

    constructor() {
        // this.createPlaylist('Bopify Playlist', '').then(id => this.addSongsToPlaylist(id, ['spotify:track:6TUf1Vw59k1f7r9X8GzYdI']));
    }

    // retrieves Spotify access token from cache or accounts.spotify.com
    getAccessToken = async() => {
        // if no token is cached or existing token has expired
        if (!this.accessToken || DateTime.utc().toMillis() > this.accessToken.expiry) {
            this.accessToken = await this._getAccessToken(); // retrieve new access token
        }
        return this.accessToken.token;
    }

    // retrieves access token via process.env.REFRESH_TOKEN for private Spotify API authorization
    _getAccessToken = async () => {
        console.log('Retrieving Spotify access token...');

        const { access_token, expires_in } = await this.request('POST', `${ this.authPath }/api/token`,
            { 'grant_type': 'refresh_token', 'refresh_token': process.env.REFRESH_TOKEN },
          { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${this.credentials}` }).catch(console.error);

        console.log(`Spotify access token retrieved (${ access_token }).`);
        return {
            token: access_token,
            expiry: DateTime.utc().plus(expires_in * 1000).toMillis()
        }
    }

    // retrieves refresh token that can be used to continually retrieve access tokens for private Spotify API authorization
    // this function is called by the /callback endpoint after manually accessing the /api/token endpoint
    getRefreshToken = async (code) => {
        const { refresh_token } = await this.request('POST', `${ this.authPath }/api/token`,
          { 'grant_type': 'authorization_code',
              'code': code,
              'redirect_uri': 'http://localhost:5000/callback'},
          { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${this.credentials}` }).catch(console.error);
        return refresh_token;
    }

    // composes redirect URL for retrieving a refresh token
    // this function is called after manually accessing the /api/token endpoint
    getRefreshTokenURL = () => {
        return `${this.authPath}/authorize?${this.encodeURL({
            'client_id': process.env.CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': 'http://localhost:5000/callback',
            'scope': this.defaultScopes.join(' '),
            'show_dialog': false
        })}`
    }

    // creates new playlist with a name and description, returns playlist id
    createPlaylist = async (name, description) => {
        const { id } = await this.request('POST', `${this.APIPath}/users/${process.env.CLIENT_USERNAME}/playlists`, {
            name,
            description,
            "public": true
        }).catch(console.error);
        return id;
    }

    // adds songs by uri to a specified playlist
    // uris should take the form ["spotify:track:{track_id}", ...]
    addSongsToPlaylist = async (id, uris) => {
        const response = await this.request('POST', `${this.APIPath}/playlists/${id}/tracks`, {
            uris: uris
        }).catch(console.error);
        console.log(response);
    }

    // get available genre seeds (not sure if we will need this)
    getGenres = async () => {
        const { genres } = await this.request('GET', `${this.APIPath}/recommendations/available-genre-seeds`).catch(console.error);
        return genres
    }

    // returns promised fetch request with automatic header authorization
    request = async (method, path, data = null, headers = 'reserved_default') => {
        if (headers === 'reserved_default') {
            headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await this.getAccessToken()}` }
        }

        let body;
        if (data && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            body = this.encodeURL(data); // encode URL data
        } else if (data && headers['Content-Type'] === 'application/json') {
            body = JSON.stringify(data); // stringify JSON data
        }

        return new Promise(async (resolve, reject) => {
            fetch(`${path}`, { method: method, body, headers }).then(async response => {
                if (response.ok) {
                    resolve(await response.json());
                } else {
                    reject(await response.json());
                }
            }).catch(error => reject(error));
        });
    }

    // encodes JSON data as URL
    encodeURL = (data) => {
        return Object.keys(data).map(k => `${k}=${ encodeURIComponent(data[k]) }`).join('&');
    }
});
