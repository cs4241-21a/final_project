const express = require("express"),
  mongodb = require("mongodb"),
  app = express(),
  port = 3000,
  bodyParser = require("body-parser"),
  path = require("path");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

var MemeName = "";
var Ex1Url = " ";
var Ex2Url = " ";
var Upvotes = 0;
var Downvotes = 0;
var Funny = 0;
var FunnyNo = 0;
var KnowYourMeme = "";
var Summary = "";

//Databases connection
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

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
  //no memes need to be loaded at this point
});

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
  //no memes need to be loaded at this point
});

app.get("/data", (req, res) => {
  if (Meme !== null) {
    Meme.find({})
      .toArray()
      .then(result => res.json(result))
      .then(json => res.render("index", json));
  }
});

app.post("/search", function(req, res) {
  var meme = String(req.body.meme);

  Meme.find({ MemeName: meme })
    .toArray()
    .then(result => {
      //if (err) return console.log(err);

      MemeName = result.MemeName;
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

app.post("/randMeme", (req, res) => {
  Meme.findOne().toArray((err, result) => {
    if (err) return console.log(err);
    MemeName = result.MemeName;
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

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/result", (request, response) => {
  response.sendFile(__dirname + "/public/result.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
