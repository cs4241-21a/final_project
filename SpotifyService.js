import fetch, { Headers } from "node-fetch";
import base64 from 'base-64';
import dotenv from 'dotenv';
dotenv.config();

export default (new class SpotifyService {
    uri = 'https://accounts.spotify.com';
    defaultHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    constructor() {
        this.getToken().then();
    }

    getToken = async () => {
        const credentials = base64.encode(`${ process.env.CLIENT_ID }:${ process.env.CLIENT_SECRET }`);
        const res = await this.POST('/api/token', {
            'grant_type': 'client_credentials'
        }, {
            'Authorization': `Basic ${ credentials }`
        }).catch(console.error);
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
