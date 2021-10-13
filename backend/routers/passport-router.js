// Import stuff for Express Router
const express = require('express')
const router = express.Router()

// Import libs for Passport.js auth
const passport = require('passport')
require('../services/passsport-service')  

// Setup route to authenticate with GitHub - redirects to github.com
router.get( '/github', passport.authenticate('github', {
    scope: [ 'user:email' ]
}))

// Setup callback redirect endpoint - when user authenticates on github.com
// they are redirected here
router.get( '/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/error'
}), function(req, res) {
    res.redirect('/');
})

// In case of errors, the user is redirected to /auth/error through failureRedirect
router.get('/error', (req, res) => {
    res.writeHeader( 400, { 'Content-Type': 'text/plain' })
    res.end("Could not authenticate you with GitHub, error from OAuth2")
})

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Export the Router for use in server.js
module.exports = router