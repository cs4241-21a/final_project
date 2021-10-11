import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import SpotifyService from "./SpotifyService.js";

const port = 5000;
const dir = `${path.resolve()}/client/build`;

// SERVER
const server = express();
server.listen(process.env.PORT || port);
server.use(express.static(dir)); // server static client build files

// DEV ROUTES

// redirect to Spotify auth portal for retrieving a refresh token
server.get('/dev/token', async (req, res) => {
    res.redirect(SpotifyService.getRefreshTokenURL());
});

// capture refresh token via Spotify auth portal callback
server.get('/callback', async (req, res) => {
    const token = await SpotifyService.getRefreshToken(req.query.code);
    res.json(`Here is your new refresh token: ${token}. Place this in process.env.REFRESH_TOKEN for private Spotify API authorization.`);
});

// API ROUTES

// get access token for authenticating Spotify Web Player
server.get('/api/token', async (req, res) => {
   res.json(await SpotifyService.getAccessToken());
});

// play song on Spotify Web Player
server.put('/api/player/:id/play', async (req, res) => {
    await SpotifyService.playSong(req.params.id, req.query.uri);
    res.send();
});

// generate new playlist based on genre
server.get('/api/playlist/generate', async (req, res) => {
    res.json(await SpotifyService.generatePlaylist(req.query.genre));
});

// get existing playlist
server.get('/api/playlist/:id', async (req, res) => {
    const playlist = await SpotifyService.getPlaylist(req.params.id);
    if (playlist) {
        res.json(playlist);
    } else {
        res.status(404);
    }
});

// delete song from playlist
server.delete('/api/playlist/:id', async (req, res) => {
    await SpotifyService.deleteSongsFromPlaylist(req.params.id, [req.query.uri]);
    res.json(await SpotifyService.getPlaylist(req.params.id));
});

// CLIENT ROUTES

// React app redirect
server.get('*', (req, res) => {
    res.sendFile(`${dir}/index.html`);
});
