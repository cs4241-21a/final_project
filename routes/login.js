var express = require('express'),
    mongodb = require( 'mongodb' ),
    bodyParser = require("body-parser"),
    cookie  = require( 'cookie-session' );
var router = express.Router();

router.use( cookie({
  name: 'session',
  keys: ['secretkey', 'cookiekey']
}))

router.get('/index.html', function(req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});
const uri = "mongodb+srv://test:tester123@cluster0.lvbd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let loginCollection = null

//connect to database
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'final_project' ).collection( 'users' )
  })
  .then( __collection => {
    // store reference to collection
    loginCollection = __collection
    //console.log(loginCollection)
    // blank query returns all documents
    loginCollection.createIndex({"username": 1}, {unique: true})
    return loginCollection.find({ }).toArray()
  })
  //.then( console.log )

let user = null;

router.post("/login", bodyParser.json(), function(req, res) {
    loginCollection
    .find({ username: req.body.username, password: req.body.password })
    .toArray()
    .then(result => {
        if(result.length == 1) {
          req.session.login = true
        }
        res.json(result)
    });
    user = req.body.username;
  });
  
router.post("/create", bodyParser.json(), function(req, res) {
    user = req.body.username;
    loginCollection.insertOne( req.body )
    .then( insertResponse => loginCollection.findOne(insertResponse.insertedId) )
    .then( findResponse => res.json( findResponse))
    .catch(err => {
      console.log(err)
      res.status(500).json()
    }) 
    
});

router.post("/logout", bodyParser.json(), function(req, res) {
    user = null;
    req.session.login = false;
});

module.exports = router;