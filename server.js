const express = require('express'),
      mongodb = require("mongodb"),
      bodyParser = require("body-parser"),
      app = express(),
      port = 3001

app.use('/', express.static(__dirname + '/'))
app.use(bodyParser());

const mongoclient = mongodb.MongoClient;
const uri = "mongodb+srv://mike:" + process.env.MYPASSWORD + "@cluster0.guiga.mongodb.net/data?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let collection = null,
    player = null,
    playerInfo = null;

client
  .connect()
  .then(() => {
    return client.db("final").collection("game");
  })
  .then(_collection => {
    collection = _collection;
    return collection.find({}).toArray();
  });



app.listen(process.env.PORT || port);