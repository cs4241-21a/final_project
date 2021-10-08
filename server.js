const ws = require('ws'),
      http = require('http');

const server = http.createServer(),
      wsServer = new ws.Server({server}),
      clients = [];

wsServer.on('connection', OnConnect);
server.listen(3000);

function OnConnect(client) {
    client.on('message', OnMessage);
    client.on('close', OnClose);
    client.on('error', OnError);
    clients.push(client);
};

function OnMessage(data) {
    console.log(`Received: ${toString(data)}`);

    // Send a message to all the clients
    clients.forEach( client => {
        client.send('Got a message from someone!');
    });
};

function OnClose(client) {
    console.log('connection closed');
    console.log('disconnected');
};

function OnError(error) {
    console.log('An error occurred!');
};
