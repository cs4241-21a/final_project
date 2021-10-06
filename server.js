require('dotenv').config()
const express = require('express'),
    mongodb = require('mongodb'),
    cookie = require('cookie-session'),
    app = express()


app.use( express.json() )
app.use( express.static( 'build' ) )

app.use(cookie({
    name: 'session',
    keys: [process.env.KEY_ONE, process.env.KEY_TWO]
}))

const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASS + '@' + process.env.HOST
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let collection = null

let rooms = [];

client.connect()
    .then(() => {
        // will only create collection if it doesn't exist
        return client.db('myFirstDatabase').collection('Cluster0')
    })
    .then(__collection => {
        // store reference to collection
        collection = __collection
        // blank query returns all documents
        return collection.find({}).toArray()
    })
    .then(()=>{
    console.log;
    //TODO: once database framework is set up, set the rooms var
    //that way, dont have to request database each time for it
})

//send 503 if database not found
app.use((req, res, next) => {
    if (collection !== null) {
                next()
    } else {
        res.status(503).send()
    }
})


app.post('/register', (req, res) => {
    msg = { failed: "false" };
    failed = false;
    //server side validation that username or password cant be empty
    if (req.body.u === "" || req.body.p === "") {
        msg = { failed: "empty" }; //set msg to indicate reason for failure
        failed = true;
    }
    collection.find({ pw: { $exists: true } }).toArray() //find each entry with a password
        .then(function (result) {
            if (!failed) {
                for (i = 0; i < result.length; i++) {
                    if (req.body.u === result[i].un) { //username taken
                        msg = { failed: "exists" }
                        failed = true;
                    }
                }
            }
            if (!failed) { //register account and log in
                collection.insertOne({ un: req.body.u, pw: req.body.p })
                //set cookies
                req.session.login = true;
                req.session.user = req.body.u;
            }
            //send response with appropriate failure or success message
            res.json(msg);
        })
})

app.post('/login', (req, res) => {
    failed = true;
    collection.find({ pw: { $exists: true } }).toArray() //find each entry with a password
        .then(function (result) {
            for (i = 0; i < result.length; i++) {
                if (req.body.u === result[i].un && req.body.p === result[i].pw) {
                    failed = false; //login+password match
                }
            }
            if (!failed) { //login attempt validated against username+password in database
                // define a variable that we can check in other middleware
                // the session object is added to our requests by the cookie-session middleware
                req.session.login = true;
                req.session.user = req.body.u

                //send simple json message to indicate success
                res.json({ failed: "false" });
            } else {
                //login incorrect, send simple json message with reason for login fail
                res.json({ failed: "incorrect" });
            }
        })
})

app.get('/logout', (req, res) => {
    req.session.login = false;
    req.session.user = null;
    //What response to be sent depends on what frontend people want
})

//pending changes based on what frontend people want
app.get('/load', (req, res) => {

})

//does nothing until database is set up
app.get('/rooms', (req, res) => {
    res.json(rooms);
})