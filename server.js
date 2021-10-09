require("dotenv").config();
const express = require("express"),
  mongodb = require("mongodb"),
  mongoose = require("mongoose"),
  laundryRoom = require("./models/LaundryRoom.js"),
  timestamp = require("./models/Timestamp.js"),
  user = require("./models/User.js"),
  cookie = require("cookie-session"),
  app = express();

app.use(express.json());
app.use(express.static("build"));

app.use(
  cookie({
    name: "session",
    keys: [process.env.KEY_ONE, process.env.KEY_TWO],
  })
);

//DB_URL=mongodb+srv://cs4243:X2BtQlEN0aYxE0I@cluster0.q6pxv.mongodb.net/laundryData?retryWrites=true&w=majority
const uri =
  "mongodb+srv://cs4243:X2BtQlEN0aYxE0I8@cluster0.q6pxv.mongodb.net/laundryData?retryWrites=true&w=majority";
let connectedDB = false;
mongoose
  .connect(uri)
  .then(
    () => {
      let a = laundryRoom.model.find({}, function (err, all) {
        if (err) return handleError(err);
        console.log(all);
        connectedDB = true;
      });
    },
    (err) => {
      console.log("Error connecting to database");
      return handleError(err);
    }
  );
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TODO: once database framework is set up, set the rooms var
//that way, dont have to request database each time for it
let rooms = [];

//send 503 if database not found
app.use((req, res, next) => {
  if (connectedDB) {
    next();
  } else {
    res.status(503).send();
  }
});

//THIS WILL GO IN BODY OF REGISTER
app.post("/register", (req, res) => {
  console.log("REGISTER TEST");
  msg = { failed: "false" };
  failed = false;
  //server side validation that username or password cant be empty
  if (req.body.u === "" || req.body.p === "") {
    msg = { failed: "empty" }; //set msg to indicate reason for failure
    failed = true;
  }
  user.model.countDocuments({ un: req.body.u }, function (err, count) {
    console.log("check cd");
    if (count > 0) {
      msg = { failed: "exists" };
      failed = true;
    }
    if (!failed) {
      req.session.login = true;
      req.session.user = req.body.u;
      user.model.create(
        { un: req.body.u, pw: req.body.p, em: req.body.e, favs: [] },
        function (err, count) {}
      );
    }
    res.json(msg);
  });
});

app.post("/login", (req, res) => {
  user.model.countDocuments(
    { un: req.body.u, pw: req.body.p },
    function (err, count) {
      console.log("check l");
      if (count > 0) {
        //login attempt validated against username+password in database
        // define a variable that we can check in other middleware
        // the session object is added to our requests by the cookie-session middleware
        req.session.login = true;
        req.session.user = req.body.u;

        //send simple json message to indicate success
        res.json({ failed: "false" });
      } else {
        res.json({ failed: "incorrect" });
      }
    }
  );
});

app.get("/favBuildings", (req, res) => {
  if (req.session.login) {
    user.model.findOne({ un: req.session.user }, function (err, item) {
        res.json(item.favs);
    });
  } else {
    res.json({ failed: "Not Logged In" });
  }
});

app.post("/addFavorite", (req, res) =>{
    //should also check?: does the favorite exist
    if (req.session.login){
        user.model.findOneAndUpdate({un: req.session.user}, {$push: {favs: req.body.fav}}, function (err, item){
            //item will NOT be the updated doc here
            //you have to set an optional param to make that be the case, lmk if you need that...
        })
        res.json({failed: "false"});
    }
    else {
        res.json({ failed: "Not Logged In" });
    }
})

app.post("/delFavorite", (req, res) =>{
    //should also check?: does the favorite exist
    if (req.session.login){
        user.model.findOneAndUpdate({un: req.session.user}, {$pull: {favs: req.body.fav}}, function(err, item){
            //item will NOT be the updated doc here
            //you have to set an optional param to make that be the case, lmk if you need that...
        })
        res.json({failed: "false"});
    }
    else {
        res.json({ failed: "Not Logged In" });
    }
})

app.get("/logout", (req, res) => {
  req.session.login = false;
  req.session.user = null;
  res.json({ result: "Logged Out" });
  //What response to be sent depends on what frontend people want, if any
});

//pending changes based on what frontend people want
app.get("/load", (req, res) => {});

app.get("/laundry", (req, res) => {
  laundryRoom.model.find({}, function (err, data) {
    res.json(data);
  });
});

app.get("/timestamp", (req, res) => {
  timestamp.model.find({ name: "timestamp" }, function (err, data) {
    res.json(data);
  });
});

//does nothing until database is set up
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

//EXAMPLE OF HOW YOU MIGHT CALL REGISTER FROM FRONTEND
//   let json = { u: "test", p: "test" }
//   let body = JSON.stringify(json)
// fetch('/register', {
//   method: 'POST',
//   body: body,
//   headers: {
//       "Content-Type": "application/json"
//   }
// }).then((response)=>{
//   return response.json();
// }).then((r)=>{
//   console.log(r);
//   console.log(r.failed)
// })

app.listen(process.env.PORT || 5000);
