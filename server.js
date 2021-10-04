// Enable .env file setup
require('dotenv').config();

// Import dependencies for properly running the server
const express = require("express"),
      bodyparser = require("body-parser"),
      morgan = require('morgan'),
      mongodb = require( 'mongodb' ),
      app = express(),
      staticDir  = "public",
      port = 8080;

require('dotenv').config();

//register view engine
app.set('view engine','ejs');

///////// Define MongoDB database information //////////

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

const databaseName = "database",
      collectionName = "collection"

// Connect to MongoDB database
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db(databaseName).collection(collectionName)
  })
  .then(__collection => {
    // store reference to collection
    collection = __collection
  })

// Custom middleware for outputting an error code if the MongoDB server is down
app.use((req,res,next) => {
  if(collection !== null) {
    next()
  }else{
    res.status(503).send()
  }
})

// Use body parser to parse JSON when necessary
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Serve static files when necessary
app.use(express.static(staticDir))

// Setup handling of GET requests for homepage route
app.get('/', (request,  response) => {
  response.render('index')
})

const listener = app.listen( process.env.PORT || port, () => {
  console.log( 'Your app is listening on port: ' + listener.address().port)
})
