const express = require('express');
const app = express();
const request = require('request');
const db = require('./dbManager.mongodb');
const passport = require("passport");
const Strategy = require('passport-local').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const { response } = require('express');

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

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.render('login', { message: "Incorrect username or password" }); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
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
        res.sendFile(__dirname + "/build/profile.html")
    });

app.get('/song',
    ensureLoggedIn(),
    function (req, res) {
        res.sendFile(__dirname + "/build/song.html")
    });

app.post('/addComment', (req, res) => {
    db.getContentById(req.body.songID)
        .then(song => song[0])
        .then(theSong => {
            theSong.comments.push({ username: req.user.displayName, text: req.body.text })
            db.addOrUpdateContent(theSong.user, theSong.title, theSong.artist, theSong.coverart, theSong.comments, theSong._id)
                .then(response => {
                    res.send({ response: response })
                    res.end()
                })
        })
})

app.post('/removeSong', (req, res) => {
    console.log(req.body)
    db.deleteContent(req.user, req.body._id).then(result => {
        res.send(result)
        res.end()
    })
})

app.post('/addSong', (req, res) => {
    console.log(req.body)
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        qs: { term: req.body.songName, locale: 'en-US', offset: '0' },
        headers: {
            'x-rapidapi-host': 'shazam.p.rapidapi.com',
            'x-rapidapi-key': 'd78b659621msh22ffdaa369a9cd9p123b29jsn8434a2c82d11',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
        if (JSON.parse(response.body).tracks) {
            const matches = JSON.parse(response.body).tracks.hits.filter(song => { return song.track.title.toLowerCase() === req.body.songName.toLowerCase() && song.track.subtitle.toLowerCase() === req.body.artistName.toLowerCase() })
            if (matches.length) {
                db.addOrUpdateContent(req.user, matches[0].track.title, matches[0].track.subtitle, matches[0].track.images.coverarthq).then(result => {
                    res.send({
                        message: "Song added"
                    })
                    res.end()
                })
            } else {
                res.send({
                    message: "No song with that artist found"
                })
                res.end()
            }
        } else {
            res.send({
                message: "No song with that name found"
            })
            res.end()
        }
    });
})

app.get('/getUserSongs', (req, res) => {
    db.getContentForUser(req.user).then(result => {
        res.send(result)
        res.end()
    })
})

app.get('/getAllSongs', (req, res) => {
    db.getAllContent()
        .then(result => {
            res.send(result)
            res.end()
        })
})

app.get('/getUser', (req, res) => {
    console.log(req.user)
    res.send({ user: req.user })
    res.end()
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

app.get('/getSongById', (req, res) => {
    db.getContentById(req.query.songID).then(songArray => {
        res.send(songArray[0])
        res.end()
    })
})

app.listen(process.env.PORT || 3000);
