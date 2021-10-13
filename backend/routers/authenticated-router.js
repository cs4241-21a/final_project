// Require database services
const { MongoClient, ObjectId } = require('mongodb')
const MongoClientService = require('../services/mongodb-service.js')

const express = require('express')
const router = express.Router()

const passportAuthMiddleware = require('../services/passport-auth')


router.get("/leaderboard", passportAuthMiddleware, (req, res) => {
    MongoClientService.getLeaderboard()
        .then(result => res.json(result))
});

router.post('/score', passportAuthMiddleware, (req, res) => {
    MongoClientService.getGitHubUser(req.cookies.githubId)
        .then((user) => {
            if (user) {
                user.gamesplayed += 1
                if (req.body.playerScore > user.highscore) {
                    user.highscore = req.body.playerScore
                }
                MongoClientService.updateUser(user)
                    .then((updatedUser) => {
                        res.json(updatedUser)
                    })
            }
            else {
                res.writeHead(404, "UID not found", { 'Content-Type': 'text/plain' })
                res.end()
            }
        })
})

// Export the Router for use in server.js
module.exports = router