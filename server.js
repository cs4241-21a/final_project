const express = require("express"),
  mongodb = require("mongodb"),
  bodyParser = require("body-parser"),
  ws = require('ws'),
  app = express(),
  port = 3001;

app.use("/", express.static("public/"));
app.use(bodyParser());

const mongoclient = mongodb.MongoClient;
const uri =
  "mongodb+srv://mike:" +
  process.env.MYPASSWORD +
  "@cluster0.guiga.mongodb.net/data?retryWrites=true&w=majority";
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
    playerInfo = client.db("final").collection("game");
    return playerInfo;
  })
  .then(_collection => {
    collection = _collection;
    return collection.find({}).toArray();
  });

app.post("/login", bodyParser.json(), function(req, res) {
  playerInfo
    .find({ username: req.body.username, password: req.body.password })
    .toArray()
    .then(result => res.json(result));
  player = req.body.username;
});

app.post("/register", bodyParser.json(), function(req, res) {
  playerInfo
    .insertOne(req.body)
    .then(insertResponse => playerInfo.findOne(insertResponse.insertedId))
    .then(findResponse => res.json(findResponse));
  player = req.body.username;
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

app.get("/views/snake.html", (request, response) => {
  response.sendFile(__dirname + "/views/snake.html");
});

app.get("/views/highscore.html", (request, response) => {
  response.sendFile(__dirname + "/views/highscore.html");
});

app.get("/views/login.html", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

const server = app.listen(process.env.PORT || port);

const wss = new ws.Server({ noServer: true });
wss.on('connection', socket => {
    socket.on('message', message => {
        console.log("[WSS] " + message);
        socket.send("I got: " + message);
    });
});
server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, socket => {
        wss.emit('connection', socket, req);
    });
});