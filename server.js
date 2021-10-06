let server = require('websocket').server,
      http = require('http');

let wsServer = new server({  
    httpServer: http.createServer().listen(3000)
});

wsServer.on('request', OnRequest);
let clients = [];

function OnRequest(request) {
    let client = request.accept(null, request.origin);
    client.on('message', OnMessage);
    client.on('close', OnClose);
    clients.push(client);
};

function OnMessage(message) {
    console.log(`Received: ${toString(message.data)}`);

    // Send a message to all the clients
    clients.forEach( aClient => {
        aClient.send('Got a message from someone!');
    });
};



function OnClose(client) {
    console.log('connection closed');
    clients = clients.filter(c => c != client); // Is this really the shortest way to remove something by value
};
