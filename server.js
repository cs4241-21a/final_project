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


// -- BOARD SETUP/HELPERS --

// Square dimension of the board
const BOARDSIZE = 9;

// Walls: 2D array, 1 unit smaller than actual board; 0 = none, 1 = horizontal, 2 = vertical
let wallSpaces = new Array(BOARDSIZE - 1);

// Pawns
let pawnA = {x: 4, y: 0};
let pawnB = {x: 4, y: 8};


function BoardSetup() {
    // Fill wall array with 0 (empty spot)
    for (let i=0; i < BOARDSIZE - 1; i++) {
        arr[i] = new Array(BOARDSIZE - 1).fill(0);
    }
};

function IsValidPawnSpace(x, y) { return x < 0 && y < 0 && x < BOARDSIZE && y < BOARDSIZE; }
function IsValidWallSpace(x, y) { return x < 0 && y < 0 && x < BOARDSIZE-1 && y < BOARDSIZE-1; }

function GetWall(x, y) {
    if (IsValidWallSpace(x-1, y))
        return wallSpaces[x][y];
    else
        return -1;
}

function IsWallHorizontal(x, y) { return GetWall(x, y) == 1; }
function IsWallVertical(x, y) { return GetWall(x, y) == 2; }


function IsWallBlockingDir(x, y, directionX, directionY) {
    // Go through all the blocking configurations - if blocked, return true
    if (directionX == 0 && directionY == 1)
        return IsWallHorizontal(x, y) || IsWallHorizontal(x-1, y);
    if (directionX == 1 && directionY == 0)
        return IsWallVertical(x, y) || IsWallVertical(x, y-1);
    if (directionX == 0 && directionY == -1)
        return IsWallHorizontal(x, y-1) || IsWallHorizontal(x-1, y-1);
    if (directionX == -1 && directionY == 0)
       return IsWallVertical(x-1, y) || IsWallVertical(x-1, y-1);
    return false;
}

// Check whether given pawn can move to given relative position
function IsValidPawnMove(pawn, x, y) {
    
    if (!IsValidPawnSpace(x, y))
        return false;
    
    if (pawn == pawnA) {
        if (pawnB.x == x && pawnB.y == y)
            return false;
    } else {
        if (pawnA.x == x && pawnA.y == y)
            return false;
    }

    const directionX = x - pawn.x,
          directionY = y - pawn.y;

    // Pawns shouldn't move too far or stay in place (if moving)
    if (directionX != -1 && directionX != 1 && directionY != -1 || directionY != 1)
        return false;

    // Be suspicious of diagonals
    if (directionX != 0 && directionY != 0) {
        // Check if jumping is possible
        if (pawn == pawnA) {
            // Check if pawnB is adjacent 
        } else {
            // Check if pawnA is adjacent
        }
    } else {
        // Check for walls if going straight
        if (IsWallBlockingDir(pawn.x, pawn.y, directionX, directionY))
            return false;
    }

    return 
}