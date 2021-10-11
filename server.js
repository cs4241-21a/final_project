const express = require("express"),
  mongodb = require("mongodb"),
  app = express(),
  port = 3000,
  bodyParser = require("body-parser"),
  path = require("path");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

var MemeTitle = "";
var TemplateUrl = " ";
var Ex1Url = " ";
var Ex2Url = " ";
var Upvotes = 0;
var Downvotes = 0;
var Funny = 0;
var FunnyNo = 0;
var KnowYourMeme = "";
var Summary = "";

// our default array of memes
const memes = [];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

app.get("/result", (request, response) => {
  response.sendFile(__dirname + "/public/result.html");
});

//Databases Connection Declared
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://memeuser:${process.env.DBPASS}@memedeadhuh.gzfgl.mongodb.net/MemeDeadHuh?retryWrites=true&w=majority`;
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let Meme = null;

client
  .connect()
  .then(() => {
    return client.db("MemeDeadHuh").collection("Meme");
  })
  .then(__Meme => {
    Meme = __Meme;
    return Meme.find({}).toArray();
  });

app.get("/", (req, res) => {
  if (Meme !== null) {
    Meme.find({})
      .toArray()
      .then(result => res.json(result))
      .then(json => res.render("index", json));
  }
});

app.get("/data", (req, res) => {
  if (Meme !== null) {
    Meme.find({})
      .toArray()
      .then(result => res.json(result))
      .then(json => res.render("index", json));
  }
});

app.get("/search", (req, res) => {
  Meme.find({ MemeTitle: req }).toArrary((err, result) => {
    if (err) return console.log(err);
    MemeTitle = result.MemeTitle;
    TemplateUrl = result.TemplateUrl;
    Ex1Url = result.Ex1Url;
    Ex2Url = result.Ex2Url;
    Upvotes = result.DownVotes;
    Downvotes = result.UpVotes;
    Funny = result.Funny;
    FunnyNo = result.NotFunny;
    KnowYourMeme = result.KnowYourMeme;
    Summary = result.Summary;
    res.send(result);
  });
});

app.get("/randMeme", (req, res) => {
  Meme.findOne().toArray((err, result) => {
    if (err) return console.log(err);
    MemeTitle = result.MemeTitle;
    TemplateUrl = result.TemplateUrl;
    Ex1Url = result.Ex1Url;
    Ex2Url = result.Ex2Url;
    Upvotes = result.DownVotes;
    Downvotes = result.UpVotes;
    Funny = result.Funny;
    FunnyNo = result.NotFunny;
    KnowYourMeme = result.KnowYourMeme;
    Summary = result.Summary;
    res.send(result);
  });
});

app.post("/upvote", (req, res) => {
  console.log("upvote pressed");
  var myquery = { MemeName: MemeTitle };
  var newVote = Upvotes++;
  var newvalues = { $set: { UpVote: newVote } };
  Meme.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
  });
});

app.post("/downvote", (req, res) => {
  var myquery = { MemeName: MemeTitle };
  var newVote = Downvotes++;
  var newvalues = { $set: { DownVote: newVote } };
  Meme.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
  });
});

app.post("/funny", (req, res) => {
  var myquery = { MemeName: MemeTitle };
  var newVote = Funny++;
  var newvalues = { $set: { Funny: newVote } };
  Meme.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
  });
});

app.post("/notfunny", (req, res) => {
  var myquery = { MemeName: MemeTitle };
  var newVote = FunnyNo++;
  var newvalues = { $set: { NotFunny: newVote } };
  Meme.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
