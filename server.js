const ws = require('ws'),
      http = require('http');

const server = http.createServer(),
      wsServer = new ws.Server({server}),
      rooms = []

wsServer.on('connection', OnConnect);
server.listen(3000);

function OnConnect(wsclient) {
    let client = {wsclient, room: null}
    wsclient.on('message', (data) => OnMessage(client, data));
    wsclient.on('close', () => OnClose(client));
    wsclient.on('error', OnError);
};

function joinRoom(client, roomCode){
    if (roomCode === "none"){
        roomCode = NewRoomCode()
    }
    let room = rooms.find(_room => _room.code == roomCode)
    if (room !== undefined){
        if (room.client2 === null){
            room.client2 = client
            client.room = room
            room.sendGameStateToClients()
        }
        else{
            client.send(JSON.stringify({type: "room full"}))
        }
    }
    else{
        room = new Room(roomCode)
        rooms.push(room)
        room.client1 = client
        client.room = room
        client.send(JSON.stringify({type: "joined room", room: room.code}))
    }
}

function OnMessage(client, data) {
    let dataObject = JSON.parse(data)
    console.log(`Received: ${dataObject}`);
    
    if (dataObject.type === "connect"){
        joinRoom(client, dataObject.room)
    }
};

function OnClose(client) {
    console.log('connection closed');
    console.log('disconnected');
};

function OnError(error) {
    console.log('An error occurred!');
};

// -- BOARD SETUP/HELPERS --

// Square dimension of the board
const BOARDSIZE = 9;

class Room {
    gameState = {
        // Walls: 2D array, 1 unit smaller than actual board; 0 = none, 1 = horizontal, 2 = vertical
        wallSpaces: new Array(BOARDSIZE - 1),

        // Pawns
        pawnA: {x: 4, y: 8, walls: 10},
        pawnB: {x: 4, y: 0, walls: 10},

        // Whose turn is it
        currentPlayer: true, //true is pawnA, false is pawnB
        player: true
    }

    client1 = null
    client2 = null

    code

    constructor(newCode) {
        code = newCode
        // Fill wall array with 0 (empty spot)
        for (let i=0; i < BOARDSIZE - 1; i++) {
            gameState.wallSpaces[i] = new Array(BOARDSIZE - 1).fill(0);
        }
    }

    sendGameStateToClients(){
        this.gameState.player = true
        this.client1.wsclient.send(JSON.stringify({type: "game state", gameState: this.gameState}))
        this.gameState.player = false
        this.client2.wsclient.send(JSON.stringify({type: "game state", gameState: this.gameState}))
    }
}

function IsValidPawnSpace(x, y) { return x < 0 && y < 0 && x < BOARDSIZE && y < BOARDSIZE; }
function IsValidWallSpace(x, y) { return x < 0 && y < 0 && x < BOARDSIZE-1 && y < BOARDSIZE-1; }

function GetWall(g, x, y) {
    if (IsValidWallSpace(g, x, y))
        return g.wallSpaces[x][y];
    else
        return -1;
}

function IsWallHorizontal(g, x, y) { return GetWall(g, x, y) == 1; }
function IsWallVertical(g, x, y) { return GetWall(g, x, y) == 2; }


function IsWallBlockingDir(g, x, y, directionX, directionY) {
    // Go through all the blocking configurations - if blocked, return true
    if (directionX == 0 && directionY == 1)
        return IsWallHorizontal(g, x, y) || IsWallHorizontal(g, x-1, y);
    if (directionX == 1 && directionY == 0)
        return IsWallVertical(g, x, y) || IsWallVertical(g, x, y-1);
    if (directionX == 0 && directionY == -1)
        return IsWallHorizontal(g, x, y-1) || IsWallHorizontal(g, x-1, y-1);
    if (directionX == -1 && directionY == 0)
       return IsWallVertical(g, x-1, y) || IsWallVertical(g, x-1, y-1);
    return false;
}

// Check whether given pawn can move to given relative position
function IsValidPawnMove(g, pawn, x, y) {
    
    if (!IsValidPawnSpace(x, y)){
        return false;
    }
    
    let otherPawn = g.pawnA
    if (pawn == g.pawnA) {
        otherPawn = g.pawnB
    }

    if (otherPawn.x == x && otherPawn.y == y){
        return false;
    }

    const directionX = x - pawn.x,
          directionY = y - pawn.y;
    
    // Pawns shouldn't move too far or stay in place (if moving)
    if (Math.abs(directionX) + Math.abs(directionY) > 2)
        return false;

    // Be suspicious of diagonals
    if (directionX != 0 && directionY != 0) {
        // Check if jumping is possible
        // Check if otherPawn is adjacent
        if (!(
            otherPawn.x == pawn.x && otherPawn.y == y &&
            (IsWallBlockingDir(g, otherPawn.x, otherPawn.y, 0, directionY) || IsValidPawnSpace(otherPawn.x, otherPawn.y + directionY)) &&
            !IsWallBlockingDir(g, pawn.x, pawn.y, 0, directionY) &&
            !IsWallBlockingDir(g, otherPawn.x, otherPawn.y, directionX, 0)
            )){
                return false
        }
        else if (!(
            otherPawn.y == pawn.y && otherPawn.x == x &&
            (IsWallBlockingDir(g, otherPawn.x, otherPawn.y, directionX, 0) || IsValidPawnSpace(otherPawn.x + directionX, otherPawn.y)) &&
            !IsWallBlockingDir(g, pawn.x, pawn.y, directionX, 0) &&
            !IsWallBlockingDir(g, otherPawn.x, otherPawn.y, 0, directionY)
            )){
                return false
        }
    }
    else if (Math.abs(directionX) == 2){
        if (!(otherPawn.y == pawn.y && otherPawn.x == pawn.x + directionX/2 &&
            !IsWallBlockingDir(g, pawn.x, pawn.y, directionX/2, 0) &&
            !IsWallBlockingDir(g, otherPawn.x, otherPawn.y, directionX/2, 0))){
                return false
        }
    }
    else if (Math.abs(directionY) == 2){
        if (!(otherPawn.x == pawn.x && otherPawn.y == pawn.y + directionY/2 &&
            !IsWallBlockingDir(g, pawn.x, pawn.y, 0, directionY/2) &&
            !IsWallBlockingDir(g, otherPawn.x, otherPawn.y, 0, directionY/2))){
                return false
        }
    }
    // Check for walls if going straight
    else if (IsWallBlockingDir(g, pawn.x, pawn.y, directionX, directionY))
        return false;

    return true;
}

// Checks whether a wall placement is valid
function IsValidWallPlacement(g, walls, x, y, orientation) {
    if (!IsValidWallSpace(x, y)){
        return false
    }

    if (walls <= 0){
        return false
    }

    if (GetWall(g, x, y) != 0){
        return false
    }

    if (orientation == 1){
        if (GetWall(g, x - 1, y) == 1 || GetWall(g, x + 1, y) == 1){
            return false
        }
    }
    else if (GetWall(g, x, y - 1) == 2 || GetWall(g, x, y + 1) == 2){
        return false
    }

    //check if wall leaves no route for either player to the other side of the board

    return true
}
