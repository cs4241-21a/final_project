// MAKE SURE TO INSTALL dotenv, express, and mongodb
require("dotenv").config();
const express = require("express"),
  app = express(),
  mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient,
  // Will need to create .env file with variables for DB_USER, DB_PASS, and DB_HOST
  uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/HotelReviews?retryWrites=true&w=majority`,
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let collection = null;
client.connect((err) => {
  collection = client.db("enter db name").collection("enter collection name");
});

// Middleware to check connection to database
app.use((req, res, next) => {
  if (collection !== null) {
    next();
  } else {
    res.status(503).send();
  }
});

app.use(express.static("build"));

app.use(express.json());

// place GET, POST routes

app.listen(process.env.PORT || 3000);
