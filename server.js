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

    if (dataObject.type === "place wall"){
        placeWall(client, data.x, data.y, data.orientation)
    }

    if (dataObject.type === "move pawn"){
        movePawn(client, data.x, data.y)
    }
};

function placeWall(client, x, y, orientation) {
    let pawn
    let currentPlayer
    let gameState = client.room.gameState
    if (client.room.client1 === client){
        pawn = gameState.pawnA
        currentPlayer = gameState.currentPlayer
    }
    else{
        pawn = gameState.pawnB
        currentPlayer = !gameState.currentPlayer
    }
    if (!currentPlayer || !IsValidWallPlacement(gameState, pawn.walls, x, y, orientation)){
        client.wsclient.send(JSON.stringify({type: "invalid move"}))
    }
    else{
        gameState.wallSpaces[x][y] = orientation
        pawn.walls -= 1
        gameState.currentPlayer = !gameState.currentPlayer
        client.room.sendGameStateToClients()
    }
}

function movePawn(client, x, y) {
    let pawn
    let currentPlayer
    let gameState = client.room.gameState
    if (client.room.client1 === client){
        pawn = gameState.pawnA
        currentPlayer = gameState.currentPlayer
    }
    else{
        pawn = gameState.pawnB
        currentPlayer = !gameState.currentPlayer
    }
    if (!currentPlayer || !IsValidPawnMove(gameState, pawn, x, y)){
        client.wsclient.send(JSON.stringify({type: "invalid move"}))
    }
    else{
        pawn.x = x
        pawn.y = y
        gameState.currentPlayer = !gameState.currentPlayer
        client.room.sendGameStateToClients()
    }
}

function OnClose(client) {
    let room = client.room
    let otherClient
    if (client === client.room.client1){
        otherClient = room.client2
    }
    else{
        otherClient = room.client1
    }
    otherClient.wsclient.send(JSON.stringify({type: "opponent disconnected"}))
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
        // A column on the board is a row in the array, so we can use wallSpaces[x][y]
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

function IsValidPawnSpace(x, y) { return x >= 0 && y >= 0 && x < BOARDSIZE && y < BOARDSIZE; }
function IsValidWallSpace(x, y) { return x >= 0 && y >= 0 && x < BOARDSIZE-1 && y < BOARDSIZE-1; }

function GetWall(g, x, y) {
    if (IsValidWallSpace(x, y))
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
    else if (IsWallBlockingDir(g, pawn.x, pawn.y, directionX, directionY)) {
        return false;
    }
    return true;
}

// Checks whether a wall placement is valid
function IsValidWallPlacement(g, walls, x, y, orientation) {
    if (!IsValidWallSpace(x, y)){
        return false
    }

    if (orientation != 1 && orientation != 2){
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



// -- SAMPLE GAME STATE --
// For testing purposes

const sampleGame = {
    // Walls: 2D array, 1 unit smaller than actual board; 0 = none, 1 = horizontal, 2 = vertical
    // A column on the board is a row in the array, so we can use wallSpaces[x][y]
    wallSpaces: [
        [2,0,2,1,0,0,0,2],
        [0,1,0,1,1,1,0,0],
        [0,0,0,1,0,1,1,0],
        [0,1,0,0,1,0,0,0],
        [0,0,2,0,2,1,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,2,1,0],
        [0,0,0,2,0,1,0,0],
    ],

    // Pawns
    pawnA: {x: 0, y: 0, walls: 10},
    pawnB: {x: 0, y: 6, walls: 10},

    // Whose turn is it
    currentPlayer: true, //true is pawnA, false is pawnB
    player: true
};


// -- PATHFINDING HELPERS --

function ReachableFrom(g, pawn, x, y) {
    const origX = pawn.x;
    const origY = pawn.y;

    pawn.x = x;
    pawn.y = y;

    const dirs = [{x:  1, y:  0}, {x:  0, y:  1},
                  {x: -1, y:  0}, {x:  0, y: -1},
                  {x:  2, y:  0}, {x:  0, y:  2},
                  {x: -2, y:  0}, {x:  0, y: -2},
                  {x:  1, y:  1}, {x: -1, y:  1},
                  {x:  1, y: -1}, {x: -1, y: -1}
                ];
    const result = [];
    for (let i = 0; i < dirs.length; i++) {
        const checkX = x + dirs[i].x, checkY = y + dirs[i].y;
        if (IsValidPawnMove(g, pawn, checkX, checkY))
            result.push({x: checkX, y: checkY});
    }
    pawn.x = origX;
    pawn.y = origY;
    return result;
}

// Checks whether the given pawn can reach the other side of the board in any way
function DoesPathExistForPawn(g, pawn) {

    const graph = new Array(BOARDSIZE)
    for (let i = 0; i < BOARDSIZE; i++) {
        const column = new Array(BOARDSIZE);
        for (let j = 0; j < BOARDSIZE; j++) {
            column[j] = ReachableFrom(g, pawn, i, j);
        }
        graph[i] = column;
    }
    
    let visited = [];
    let pos = {x: pawn.x, y: pawn.y};
    const isFindingEndOfBoard = (pawn === g.pawnA)
    return ExpandNode(graph, pos, visited, isFindingEndOfBoard);
}

// Depth-first search node expansion
function ExpandNode(graph, pos, visited, isFindingEndOfBoard) {

    // Mark this node as visited
    visited.push(pos)

    // Check if the end has been reached
    let goalY = BOARDSIZE-1;
    if (!isFindingEndOfBoard)
        goalY = 0;
    
    if (pos.y === goalY)
        return true;
    
    // Pick candidates - reachable nodes that haven't been visited yet
    let candidates = []
    for (let i = 0; i < (graph[pos.x][pos.y]).length; i++) {
        let entry = graph[pos.x][pos.y][i]
        if (!visited.some((pos) => pos.x === entry.x && pos.y === entry.y)) {
            candidates.push(entry)
        }
    }

    // Search along each new path until it ends or reaches the other side of the board
    for (let i = 0; i < candidates.length; i++) {
        if (ExpandNode(graph, candidates[i], visited, isFindingEndOfBoard))
            return true
    }
    return false;
}

// Just prints the board to the console
function PrintBoard(g) {
    for (let row = 0; row < BOARDSIZE; row++) {
        let row1Text = '', row2Text = '';
        for (let col = 0; col < BOARDSIZE; col++) {

            if (g.pawnA.x === col && g.pawnA.y === row) {
                row1Text += 'A'
            } else if (g.pawnB.x === col && g.pawnB.y === row) {
                row1Text += 'B'
            } else {
                row1Text += ' '
            }

            if (col < BOARDSIZE - 1) {
                if (((row < BOARDSIZE - 1 && (g.wallSpaces)[col][row] === 2) || (row > 0 && g.wallSpaces[col][row-1] === 2)))
                    row1Text += '|'
                else
                    row1Text += ' '
            }

            if (row < BOARDSIZE - 1) {
                if (((col < BOARDSIZE - 1 && (g.wallSpaces)[col][row] === 1) || (col > 0 && g.wallSpaces[col-1][row] === 1)))
                    row2Text += '-'
                else
                    row2Text += ' '
                if (col < BOARDSIZE - 1)
                    row2Text += '+'
            }
        }
        console.log('.'+row1Text +'.\n.'+ row2Text +'.')
    }
}

console.log('Pawn A has path: ' + DoesPathExistForPawn(sampleGame, sampleGame.pawnA));
console.log('Pawn B has path: ' + DoesPathExistForPawn(sampleGame, sampleGame.pawnB));

PrintBoard(sampleGame);
