import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import SpotifyService from "./SpotifyService.js";

const port = 5000;
const dir = `${path.resolve()}/client/build`;

// server
const server = express();
server.listen(port);

// middleware
server.use(express.static(dir)); // server static client build files

// api routes
server.get('/api/token', async (req, res) => {
    res.redirect(SpotifyService.getRefreshTokenURL());
});


server.get('/callback', async (req, res) => {
    const token = await SpotifyService.getRefreshToken(req.query.code);
    res.json(`Here is your new refresh token: ${token}. Place this in process.env.REFRESH_TOKEN for private Spotify API authorization.`);
});

// client routes
server.get('*', (req, res) => {
    res.sendFile(`${dir}/index.html`);
});
