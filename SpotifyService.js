import fetch from "node-fetch";
import base64 from 'base-64';
import dotenv from 'dotenv';
dotenv.config();
import { DateTime } from "luxon";

let GENRE_DICTIONARY = {
    'hip-hop': '2LIk90788K0zvyj2JJVwkJ,4r63FhuTkUYltbVAg5TQnk,4Ga1P7PMIsmqEZqhYZQgDo,3TVXtAsR1Inumwj472S9r4,6l3HvQ5sa6mXTsMTB19rO5',
    'edm': '1Cs0zKBU1kc0i8ypK3B9ai,4AVFqumd2ogHFlRbKIjp1t,64KEffDW9EtZ1y2vBYgq8T,1vCWHaC5f2uS3yhpwWbIA6,6nxWCVXbOlEVRexSbLsTer',
    'pop': '4yvcSjfu4PC0CYQyLy4wSq,1Xyo4u8uXC1ZmMpatF05PJ,1uNFoZAHBGtllmzznpCI3s,6eUKZXaKkcviH0Ku9w2n3V,66CXWjxzNUsdJxJ2JdwvnR',
    'hard-rock': '7Ey4PD4MYsKc5I2dolUwbH,6ZLTlhejhndI4Rh53vYhrY,711MCceyCBcFnzjGY4Q7Un,07XSN3sPlIlB2L2XNcTwJw,2ye2Wgw4gimLv2eAKyk1NB'

}
export default (new class SpotifyService {
    authPath = 'https://accounts.spotify.com';
    APIPath = 'https://api.spotify.com/v1';
    defaultScopes = [
        'playlist-modify-public',
        'streaming',
        'user-read-email',
        'user-read-private',
        'web-playback'
    ]
    credentials = base64.encode(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    accessToken;

    constructor() {
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
        await this.request('POST', `${this.APIPath}/playlists/${id}/tracks`, {
            uris: uris
        }).catch(console.error);
    }

    // deletes songs by uri from a specified playlist
    // uris should take the form ["spotify:track:{track_id}", ...]
    deleteSongsFromPlaylist = async (id, uris) => {
        await this.request('DELETE', `${this.APIPath}/playlists/${id}/tracks`, {
            tracks: uris.map(uri => { return { uri } })
        }).catch(console.error);
    }

    // retrieves playlists with song data
    getPlaylist = async (id) => {
        console.log(`Retrieving playlist ${id}...`);

        const params = {
           fields: 'id,href,items(track(name,popularity,track_number,uri,id,duration_ms,artists(name),album(images)))'
        }
        const playlist = await this.request('GET', `${this.APIPath}/playlists/${id}/tracks?${this.encodeURL(params)}`).catch(console.error);
        if (playlist.error) {
            console.log(`Playlist doesn't exist!`);
            return null;
        }

        const songs = playlist.items.map(i => i.track);
        songs.forEach(t => {
           t.artists = t.artists.map(a => a.name);
           t.album_image_url = t.album.images.find(i => i.height === 64).url;
           delete t.album;
        });
        return {
            id,
            href: `https://open.spotify.com/playlist/${id}`,
            songs
        };
    }

    generatePlaylist = async (genre) => {
        console.log(`Generating playlist for ${genre}...`);

        const id = await this.createPlaylist(`${ Genres[genre].label } Party Playlist`, `Party playlist generated by Bopify.`);
        await this.addSongsToPlaylist(id, ['spotify:track:6TUf1Vw59k1f7r9X8GzYdI', 'spotify:track:4HTY26kzdGCKJF1EqcRd2J']);
        return await this.getPlaylist(id);
    }

    getListOfSongsByGenre = async(genre) => {
        let listOfArtistIDs = GENRE_DICTIONARY[genre]
        const {tracks} = await this.request('GET', `${this.APIPath}/recommendations?seed_artists=${listOfArtistIDs}`).
            catch(console.error)
        return tracks.map(t => t.uri)
    }

    // get available genre seeds (not sure if we will need this)
    getGenres = async () => {
        const { genres } = await this.request('GET', `${this.APIPath}/recommendations/available-genre-seeds`).catch(console.error);
        return genres
    }

    // plays given song uri on a specified device
    playSong = async (id, uri) => {
        await this.request('PUT', `${this.APIPath}/me/player/play?device_id=${id}`, {
            'uris': [uri]
        });
    }

    //shuffle playlist with different songs of the same genre
    shufflePlaylist = async (id, genre) => {
        const playlist = this.getPlaylist(id)

        await this.deleteSongsFromPlaylist(id, songs.map(song => song.uri));

        await this.addSongsToPlaylist(id, getSongsByGenre(genre));

        return playlist;
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
                let res;
                try {
                    res = await response.json();
                } catch {
                    res = null;
                }
                if (response.ok) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }).catch(error => reject(error));
        });
    }

    // encodes JSON data as URL
    encodeURL = (data) => {
        return Object.keys(data).map(k => `${k}=${ encodeURIComponent(data[k]) }`).join('&');
    }
});

// copied from ./client/src/globals.js because I can't be bothered to figure out module import issue
const Genres = {
    'hip-hop': {
        id: 'hip-hop',
        label: 'Hip Hop'
    },
    'hard-rock': {
        id: 'hard-rock',
        label: 'Hard Rock'
    },
    'electronic': {
        id: 'electronic',
        label: 'Techno'
    },
    'club': {
        id: 'club',
        label: 'Club'
    }
}
