let socket;

function joinWithCode(roomCode) {
    socket.send(JSON.stringify({type: 'connect', room: roomCode}));
}

function moveMyPawn(x, y) {
    socket.send(JSON.stringify({type:'move pawn', x: x, y: y}))
}

function placeAWall(x, y, orientation) {
    socket.send(JSON.stringify({type:'place wall', x: x, y: y, orientation: orientation}))
}


function wsSetup() {
    socket = new WebSocket('ws://localhost:3000');

    socket.onopen = function () {
        // Sending to server
        joinWithCode('none');
    };

    // Receiving from server
    socket.onmessage = function (message) {
        console.log(message.data);
    };

    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error);
    };
}