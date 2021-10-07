const express = require('express');
const app = express();
const request = require('request');
const db = require('./dbManager.mongodb');
const passport = require("passport");
const Strategy = require('passport-local').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.set('views', __dirname + '/build');
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'r2xyZ6bqBgmufbS', resave: false, saveUninitialized: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('build'));

passport.use(new Strategy(
    function (username, password, cb) {
        db.checkPass(username, password).then((user) => {
            return cb(null, user);
        }).catch(error => {
            return cb(error)
        }
        );
    }
));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
    db.getUser(username)
        .then((user, error) => {
            if (error) return cb(error);
            cb(null, user);
        })
        .catch(error => {
            return cb(error)
        });
});

// app.get('/',
//     function (req, res) {
//         db.getAllContent().then(content =>
//             res.render('index', { user: req.user, content: content, readonly: true }))
//     });

app.get('/login', function (req, res) {
    res.render('login', { message: "" });
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('profile');
    });

app.get('/signup',
    function (req, res) {
        res.render('signup', { message: "", username: "", displayName: "", password: "" });
    });

app.post('/signup',
    function (req, res) {
        db.CreateUser(req.body.username, req.body.displayName, req.body.password)
            .then(message => res.render('login', { message: message }))
            .catch(message => res.render('signup', {
                message: message,
                username: req.body.username,
                displayName: req.body.displayName,
                password: req.body.password
            }))
    });

app.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });

app.get('/profile',
    ensureLoggedIn(),
    function (req, res) {
        db.getContentForUser(req.user)
            .then(content => {
                res.render('profile', { user: req.user, content: content, readonly: false })
            })
            .catch(error => {
                return cb(error)
            });
    });

app.get('/getSongs', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
        qs: { key: '484129036', locale: 'en-US' },
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': 'd78b659621msh22ffdaa369a9cd9p123b29jsn8434a2c82d11',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(body)
        res.end()
    });

})

app.get('/getSongByName', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        qs: { term: req.query.term, locale: 'en-US', offset: '0', limit: '5' },
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': 'd78b659621msh22ffdaa369a9cd9p123b29jsn8434a2c82d11',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        //console.log(body)
        res.json(body)
        res.end()
    });

})

app.listen(3000);
