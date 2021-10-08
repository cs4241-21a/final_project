require('dotenv').config();
const database = require('./database')(process.env.MONGODB_URI);
const express  = require( 'express' );
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;

// Express app
const app = express();
const port = process.env.PORT || 8080;
const domainName = "localhost";

// Middleware
app.use(express.json());
app.use('/js', express.static(__dirname + '/build/js'));
app.use('/css', express.static(__dirname + '/build/css'));
app.use('/_snowpack', express.static(__dirname + '/build/_snowpack'))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000,
     }
}));

app.use(passport.initialize());
app.use(passport.session());

// Github Authentication
const githubClientID = process.env.GITHUB_ID;
const githubClientSecret = process.env.GITHUB_SECRET;

const isLoggedIn = (req, res, next) => {
    if (req.user) next();
    else res.redirect('/login');
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: githubClientID,
    clientSecret: githubClientSecret,
    callbackURL: 'http://' + domainName + ':' + port + '/auth/github/callback'
},
function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
}));

  // Homepage
app.get('/', isLoggedIn, (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

app.get('/login', (req, res) => {
    if(req.user) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/build/login.html');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }),
function(req, res) {
    // Nothing
});

app.get('/auth/github/callback',
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
    res.redirect('/');
});

// REST Endpoints
app.get('/getAllCalendars', isLoggedIn, async function(req, res) {
    let response = await database.getAllCalendars(req.user.id);
    res.send(response);
});

app.post('/addCalendar', async function(req, res) {
    let response = await database.addCalendar(req.body);
    res.send(response)
});

app.post('/deleteCalendar', async function(req, res) {
    let response = await database.deleteCalendar(req.body);
    res.send(response)
});

app.post('/modifyCalendar', async function(req, res) {
    let response = await database.updateCalendar(req.body);
    res.send(response)
});

app.get('/getAllEvents', isLoggedIn, async function(req, res) {
    let response = await database.getAllEvents(req.user.id);
    res.send(response);
});

app.post('/addEvent', async function(req, res) {
    let response = await database.addEvent(req.body);
    res.send(response)
});

app.post('/deleteEvent', async function(req, res) {
    let response = await database.deleteEvent(req.body);
    res.send(response)
});

app.post('/modifyEvent', async function(req, res) {
    let response = await database.updateEvent(req.body);
    res.send(response)
});

app.get('/getAllTasks', isLoggedIn, async function(req, res) {
    let response = await database.getAllTasks(req.user.id);
    res.send(response);
});

app.post('/addTask', async function(req, res) {
    let response = await database.addTask(req.body);
    res.send(response)
});

app.post('/deleteTask', async function(req, res) {
    let response = await database.deleteTask(req.body);
    res.send(response)
});

app.post('/modifyTask', async function(req, res) {
    let response = await database.updateTask(req.body);
    res.send(response)
});

app.get('/getUserID', isLoggedIn, async function(req, res) {
    res.send(req.user.id)
});


app.listen(port);