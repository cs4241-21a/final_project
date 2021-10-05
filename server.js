const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(express.urlencoded({extended: true}));

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
app.post("/login", (req, res) => {console.log(req.body)});

/*
Attempt to create a new user with the specified username/password
If duplicate username, respond with 400
*/
app.post("/signup", (req, res) => {});

/*
Respond with a json object of the currently logged in user, and all their lifting data
If not logged in, respond with a 401
*/
app.get("/me", (req, res) => {
  res.json({ username: "username", workouts: [] });
});

// Although we want express.static, we are using react-router for routing so we only need index.html
// Define all GET routes before this so that we don't accidentaly send index.html when we want something else
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.get("/login", (req, res) => {console.log(req.body)});

app.listen(3000);
