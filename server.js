// MAKE SURE TO INSTALL dotenv, express, and mongodb
require("dotenv").config();
const express = require("express"),
  app = express(),
  mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient,
  // Will need to create .env file with variables for DB_USER, DB_PASS, and DB_HOST
  // uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/HotelReviews?retryWrites=true&w=majority`,
  uri = `mongodb+srv://test_user:tester_user_pw@cluster0.dpk53.mongodb.net/`,
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let collection_profile = null;
  let collection_admin = null;
  let collection_skill = null;
  let collection_class = null;
  let collection_post = null;
  let collection_postComment = null;

  let collection_studentSkillRelation = null;
  let collection_studentClassRelation = null;
  let collection_postSkillRelation = null;

client.connect()

client.once("open", () => {
  collection_profile = client.db("WebwareGroupProject").collection("Profile");
  collection_admin = client.db("WebwareGroupProject").collection("Admin");
  collection_skill = client.db("WebwareGroupProject").collection("Skill");
  collection_class = client.db("WebwareGroupProject").collection("Class");
  collection_post = client.db("WebwareGroupProject").collection("Post");

  collection_studentSkillRelation = client.db("WebwareGroupProject").collection("StudentSkillRelation");
  collection_studentClassRelation = client.db("WebwareGroupProject").collection("StudentClassRelation");
  collection_postSkillRelation = client.db("WebwareGroupProject").collection("PostSkillRelation");

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
