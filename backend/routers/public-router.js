const express = require('express')
const router = express.Router()
const path = require('path')
const passportAuthMiddleware = require('../services/passport-auth')

router.get("/", (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log(`User ${ip} is logged in: ${req.isAuthenticated()}`)
    if (req.isAuthenticated()) {
        console.log(`User ${ip}: username: ${req.user.username}`)
        res.redirect('/room')
    } else {
        res.sendFile(path.resolve(__dirname + "/../../build/login.html"))
    }
})

router.get("/room", passportAuthMiddleware, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../../build/room.html"))
})

router.get("/game", passportAuthMiddleware, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../../build/game.html"))
})

router.get("/leaderboard", passportAuthMiddleware, (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../../build/leaderboard.html"))
})

// Export the Router for use in server.js
module.exports = router