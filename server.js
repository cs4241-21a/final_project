const express = require("express"),
  mongodb = require("mongodb"),
  bodyParser = require("body-parser"),
  session  = require('express-session'),
  ws = require('ws'),
  app = express(),
  port = 3001;

app.use("/", express.static("public/"));
app.use(bodyParser());

let sessionParser = session({ secret: 'who even needs security', cookie: { maxAge: 60000 }});
app.use(sessionParser);

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
  req.session.username = req.body.username;
});

app.post("/register", bodyParser.json(), function(req, res) {
  playerInfo
    .insertOne(req.body)
    .then(insertResponse => playerInfo.findOne(insertResponse.insertedId))
    .then(findResponse => res.json(findResponse));
  player = req.body.username;
  req.session.username = req.body.username;
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
let allClients = [];
let lobbies = [];

function createLobby(name, password=undefined) {
    let lobby = {
        name,
        password,
        clients: [],
        viruses: [],
    };

    lobby.addClient = nc => {
        console.log("Adding " + nc.id + " to lobby " + lobby.name);
        lobby.clients.forEach(c => {
            c.socket.send(JSON.stringify({packetType: "joined", id: nc.id, username: nc.username}));
            nc.socket.send(JSON.stringify({packetType: "joined", id: c.id, username: c.username}));
        });
        lobby.clients.push(nc);
    }

    return lobby;
}

function findLobbyWithClient(clientId) {
    return lobbies.find(l => l.clients.some(c => c.id === clientId));
}

let _lobbyCounter = 0;
function generateLobbyName() {
    const name = "lobby" + _lobbyCounter;
    _lobbyCounter++;
    return name;
}

let _clientCounter = 0;
function generateClientName() {
    const name = "client" + _clientCounter;
    _clientCounter++;
    return name;
}

function createClient(id, socket, address, username){
  return {id, socket, address, username, x: 0, y: 0, vx: 0, vy: 0, angle: 0};
}

wss.on('connection', (socket, req) => {
    sessionParser(req, {}, function(){
      const clientId = generateClientName();
      const username = req.session && req.session.username;
      if(username === undefined) return;
      socket.send("Hello World! session.username = " + (req.session && req.session.username));
      allClients.push(createClient(clientId, socket, req.socket.remoteAddress, username));
      socket.on('message', message => {
          //socket.send("I got: " + message);

          try{
              const json = JSON.parse(message);
              //console.log("[" + req.socket.remoteAddress + "] " + json);
              switch(json.packetType) {
                  case "join_lobby":
                    { 
                      let lobby = lobbies.find(l => l.name === json.name);
                      console.log(JSON.stringify(lobby));
                      if(lobby !== undefined) {
                        if(lobby.password === json.password) {
                          socket.send(JSON.stringify({packetType: "joined_lobby", name: lobby.name}));
                          lobby.addClient(allClients.find(c => c.id == clientId));
                        }
                      }else{
                        lobby = createLobby(json.name, json.password);
                        lobbies.push(lobby);
                        socket.send(JSON.stringify({packetType: "joined_lobby", name: lobby.name}));
                        socket.send(JSON.stringify({packetType: "send_field"}));
                        lobby.addClient(allClients.find(c => c.id == clientId));
                      }
                    }
                    break;
                  case "update_pos":
                      {
                        const lobby = findLobbyWithClient(clientId);
                        if(lobby !== undefined) {
                          let clIndex = lobby.clients.findIndex(c => c.id == clientId);
                          lobby.clients[clIndex].x = json.x;
                          lobby.clients[clIndex].y = json.y;
                          lobby.clients[clIndex].vx = json.vx;
                          lobby.clients[clIndex].vy = json.vy;
                          lobby.clients[clIndex].angle = json.angle;
                          
                          lobby.clients.forEach(c => {
                              if(lobby.clients[clIndex].id !== c.id) {
                                  c.socket.send(JSON.stringify({packetType: "update_player", id: lobby.clients[clIndex].id, x: lobby.clients[clIndex].x, y: lobby.clients[clIndex].y, vx: lobby.clients[clIndex].vx, vy: lobby.clients[clIndex].vy, angle: lobby.clients[clIndex].angle}));
                              }
                          });
                        }else{
                          console.log("Recieved " + json.packetType + " packet from client not in a lobby: " + clientId);
                        }
                      }
                      break;
                  case "send_field": 
                    {
                        const lobby = findLobbyWithClient(clientId);
                        if(lobby !== undefined) {
                          // TODO: remove from lobby.viruses
                          lobby.viruses = json.stars;
                        }else{
                          console.log("Recieved " + json.packetType + " packet from client not in a lobby: " + clientId);
                        }
                    }
                    break;
                  case "destroy_virus":
                      {
                        const lobby = findLobbyWithClient(clientId);
                        if(lobby !== undefined) {
                          // TODO: remove from lobby.viruses
                          lobby.clients.forEach(c => {
                              if(c.id !== clientId) {
                                c.send({packetType: "destroy_virus", eid: json.eid});
                              }
                          });
                        }else{
                          console.log("Recieved " + json.packetType + " packet from client not in a lobby: " + clientId);
                        }
                      }
                      break;

              }
          }catch(e){
              console.log("Recieved malformed packet from " + req.socket.remoteAddress + ": " + message);
              console.error(e);
          }
      });
    });
});
server.on('upgrade', (req, socket, head) => {
    console.log("req.body.username = " + (req.body && req.body.username));
    wss.handleUpgrade(req, socket, head, socket => {
        wss.emit('connection', socket, req);
    });
});

// slow loop
setInterval(() => {
    let closedClients = allClients.filter(c => c.socket.readyState != 1);
    closedClients.forEach(c => {
        console.log("Client disconnected: " + c.address);
    });
    allClients = allClients.filter(c => c.socket.readyState == 1); // only keep open connections
    allClients.forEach(c => {
        //console.log(c.address + ": " + c.socket.readyState);
        c.socket.send("keepalive");
    });

    lobbies.forEach(l => {
        let closedClients = l.clients.filter(c => c.socket.readyState != 1);
        closedClients.forEach(closed => {
            l.clients.forEach(c => {
                c.socket.send(JSON.stringify({packetType: "disconnected", id: closed.id}));
            });
        });
      l.clients = l.clients.filter(c => c.socket.readyState == 1);
    });

}, 1000);

// fast loop
setInterval(() => {
    lobbies.forEach(l => {
        l.clients.forEach(c => {
            c.socket.send(JSON.stringify({packetType: "update_viruses", viruses: l.viruses}));
          
            // l.clients.forEach(c2 => {
            //     if(c2.id !== c.id) {
            //         c.socket.send(JSON.stringify({packetType: "update_player", id: c2.id, x: c2.x, y: c2.y, vx: c2.vx, vy: c2.vy, angle: c2.angle}));
            //     }
            // });
        });
    });
}, 100);