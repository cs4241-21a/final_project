const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const session = require("express-session");

const mongoUri =
  "mongodb+srv://groupAdmin:groupPassword@cluster0.9zsah.mongodb.net/";

const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect((err) => {
  console.log("Mongo client connected :)");
});

const app = express();

app.use(
  session({ secret: "fortnite", resave: false, saveUninitialized: true })
);
app.use(express.json());
app.use(express.static("build"));
app.use(express.urlencoded({ extended: true }));

/*
===================================================
USER AUTHENTICATION ROUTES
===================================================
POST /login
POST /signup
GET /me
*/

/*
Try to log the user in
Give them a cookie to keep track of them
If invalid login info, respond with 400
*/

app.post("/login", async (req, res) => {
  const userInfo = req.body;
  const userLookup = await mongoClient
    .db("final")
    .collection("users")
    .findOne(userInfo);

  if (!userLookup) {
    console.log(`Login failed attempted user/pass:`);
    console.log(userInfo);
    res.status(400).end();
    return;
  }

  console.log(`Session is now logged in as ${userLookup.username}`);
  req.session.username = userLookup.username;
  console.log(req.session);
  res.json(userLookup);
});

/*
Attempt to create a new user with the specified username/password
If duplicate username, respond with 400
*/
app.post("/signup", async (req, res) => {
  const userInfo = req.body;
  const existingUser = await mongoClient
    .db("final")
    .collection("users")
    .findOne({ username: req.body.username });

  if (existingUser) {
    console.log(
      `Attempted to sign up with existing username: ${existingUser.username}`
    );
    res.status(400).end();
    return;
  }

  const insertRes = await mongoClient
    .db("final")
    .collection("users")
    .insertOne(userInfo);

  console.log(`Added new user with username ${userInfo.username}`);

  console.log("Logging in by setting session username");
  req.session.username = userInfo.username;
  console.log(req.session);
  res.json(userInfo);
});

/*
Respond with a json object of the currently logged in user, and all their lifting data
If not logged in, respond with a 401
*/
app.get("/me", async (req, res) => {
  if (!req.session.username) {
    console.log("Non-logged person tried /me");
    res.status(401).end();
    return;
  }
  const userRes = await mongoClient
    .db("final")
    .collection("users")
    .findOne({ username: req.session.username });

  if (!userRes) {
    console.log("Session has an invalid username (THIS SHOULD NEVER HAPPEN)");
    res.status(401).end();
    return;
  }
  console.log("Reminding user that they are logged in");
  res.json(userRes);
});

// Although we want express.static, we are using react-router for routing so we only need index.html
// Define all GET routes before this so that we don't accidentaly send index.html when we want something else
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});


app.get("/login", (req, res) => {
  console.log(req.body);
});
