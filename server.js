var express = require("express");
var app = express();
var bodyparser = require('body-parser');
var mongodb = require('mongodb');
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(5000);


app.post('/test', function(req, res) {
  console.log("I get a request!");
  console.log("here!!! " + req.body);
})
