
const WALL_HORIZONTAL = 1
const WALL_VERTICAL = 2
const PAWN_SIZE = 55
const CELL_SIZE = 40
const CELL_GAP = 15
const CELL_X_OFFSET = 13.75
const CELL_Y_OFFSET = 445.5
const WALL_CENTER_START_X = CELL_X_OFFSET + PAWN_SIZE - (CELL_GAP / 2)
const WALL_CENTER_START_Y = CELL_Y_OFFSET - (CELL_GAP / 2)
const WALL_SIZE = 95
const WALL_THICKNESS = 5
const FORM = document.getElementById("moveform")
let MOVE_TYPE
let renderInvalidMove = false
let isGameOver = false

var gameState = {
    wallSpaces: [],
    pawnA: {
        x: 0,
        y: 0,
        walls: 10
    },
    pawnB: {
        x: 0,
        y: 0,
        walls: 10
    },
    currentPlayer: false,
    player: false
}
var gameSetup = false

function setup() {
    createCanvas(505, 600);
}

function draw() {
    background(255)
    fill(209,173,107)
    rect(0, 0, 505, 505)
    let rows = 9
    let cols = 9

    for (let i = 0.25; i < cols; i++){
        for(let j = 0.1; j < rows; j++){

            let x = i * 55
            let y = j * 55

            fill(240, 220, 182)
            noStroke()
            square(x, y, 40, 5)

            // console.log("x = " + x + " , y = " + y)

        }

    }

    noStroke()
    fill(0)
    textSize(16);

    text('A', 30, 500);
    text('B',85, 500);
    text('C',140, 500);
    text('D',195, 500);
    text('E',250, 500);
    text('F',305, 500);
    text('G',360, 500);
    text('H',415, 500);
    text('I',470, 500);

    text('9', 2, 35);
    text('8',2, 90);
    text('7',2, 145);
    text('6',2, 200);
    text('5',2, 255);
    text('4',2, 310);
    text('3',2, 365);
    text('2',2, 420);
    text('1',2, 475);

    if (gameSetup) {
        if (gameState.player === gameState.currentPlayer && !gameOver()) {
            highlightHoveredCell()
            highlightHoveredWall()
        }
        renderGameState()
    } else {
        fill(0)
        text('Waiting for opponent', 30, 520);
    }

    if (renderInvalidMove) {
        fill(255, 0, 0)
        text('Invalid Move!', 150, 520);
    }

}
 

function mouseClicked() {
    renderInvalidMove = false
    console.log(mouseX, mouseY)
    console.log(JSON.stringify(gameState))

    MOVE_TYPE = FORM.elements.move.value

    if(MOVE_TYPE == "movePawn"){
        console.log("move type is movePawn so moving is allowed")

        // Move pawn
        if (gameSetup && gameState.currentPlayer === gameState.player) {
            let clickedCell = pixelToCell(mouseX, mouseY)
            console.log(`Moving to ${clickedCell[1] - 1}, ${clickedCell[0] - 1}`)
            if (clickedCell[0] !== -1) {
                moveMyPawn(clickedCell[1] - 1, clickedCell[0] - 1)
            }
        }

    } else if (MOVE_TYPE == "placeHorWall"){
        console.log("move type is placeHorWall so placing a horizontal wall is allowed")

        // Place horizontal wall
        if (gameSetup && gameState.currentPlayer === gameState.player) {
            let clickedWall = pixelToWall(mouseX, mouseY)
            console.log("this is the clicked wall" + clickedWall)
            if (clickedWall[0] !== -1) {
                placeWall(clickedWall[1] - 1, clickedWall[0] -2 , 1)
            }
        }

    } else if (MOVE_TYPE == "placeVerWall"){
        console.log("move type is placeVerWall so placing a vertical wall is allowed")

        // Place vertical wall
        if (gameSetup && gameState.currentPlayer === gameState.player) {
            let clickedWall = pixelToWall(mouseX, mouseY)
            console.log("this is the clicked wall" + clickedWall)
            if (clickedWall[0] !== -1) {
                placeWall(clickedWall[1] - 1, clickedWall[0] -2 , 2)
            }
        }

    }

}

function renderGameState() {
    drawPawn(50, gameState.pawnA.y + 1, gameState.pawnA.x + 1)
    drawPawn(255, gameState.pawnB.y + 1, gameState.pawnB.x + 1)
    for (let row = 0; row < gameState.wallSpaces.length; row++) {
        for (let col = 0; col < gameState.wallSpaces[0].length; col++) {
            if (gameState.wallSpaces[row][col] !== 0) {
                drawWall(col, row, gameState.wallSpaces[row][col])
            }
        }
    }
    fill(0)

    if(isGameOver || gameOver()) {
        isGameOver = true
        fill(0)
        if (currentPlayerIsWinner()) {
            text('You Win!', 30, 520);
        } else {
            text('You Lose!', 30, 520);
        }
        return
    }

    if (gameState.currentPlayer === gameState.player) {
        text('Your Turn!', 30, 520);
    } else {
        text('Opponents Turn!', 30, 520);
    }
    if (gameState.player) {
        text('You are the black pawn!', 30, 550);
    } else {
        text('You are the white pawn!', 30, 550);
    }

    if (gameState.player) {
        text(`You have ${gameState.pawnA.walls} walls remaining`, 300, 520);
    } else {
        text(`You have ${gameState.pawnB.walls} walls remaining`, 300, 520);
    }

}

function currentPlayerIsWinner() {
    if (gameState.pawnA.y === 0 && gameState.player) {
        return true
    } else if (gameState.pawnB.y === 8 && !gameState.player) {
        return true
    }
    return false
}

function gameOver() {
    if (gameState.pawnA.y === 0) {
        return true
    } else if (gameState.pawnB.y === 8) {
        return true
    }
    return false
}

function highlightHoveredCell() {
    let cell = pixelToCell(mouseX, mouseY)
    let bounds = getCellBounds(cell[0], cell[1])
    fill(182, 220, 184)
    noStroke()
    square(bounds[0], bounds[1], 40, 5)
}

function highlightHoveredWall() {
    let cell = pixelToWall(mouseX, mouseY)
    let bounds = getCellBounds(cell[0], cell[1])
    fill(255, 0, 0)
    noStroke()
    square(bounds[0] + 45, bounds[1] + 45, 5, 5)
}


function pixelToCell(pixelX, pixelY) {
    for (let row = 1; row <= 9; row++) {
        for (let col = 1; col <= 9; col++) {
            let bounds = getCellBounds(row, col)
            let cellXMin = bounds[0]
            let cellYMin = bounds[1]
            let cellXMax = bounds[2]
            let cellYMax = bounds[3]
            if (pixelX > cellXMin && pixelX < cellXMax && pixelY > cellYMin && pixelY < cellYMax) {
                return [row, col]
            }
        }
    }
    return [-1, -1]
}

function pixelToWall(pixelX, pixelY) {
    for (let row = 1; row <= 9; row++) {
        for (let col = 1; col <= 9; col++) {
            let bounds = getCellBounds(row, col)
            let cellXMin = bounds[2]
            let cellYMin = bounds[3]
            let cellXMax = bounds[2] + CELL_X_OFFSET
            let cellYMax = bounds[3] + CELL_Y_OFFSET
            if (pixelX > cellXMin && pixelX < cellXMax && pixelY > cellYMin && pixelY < cellYMax) {
                return [row, col]
            }
        }
    }
    return [-1, -1]
}

function getCellBounds(row, col) {
    let cellStartX = PAWN_SIZE * (col - 1) + CELL_X_OFFSET
    let cellStartY = CELL_Y_OFFSET - (PAWN_SIZE * (row - 1))
    let cellEndX = cellStartX + CELL_SIZE
    let cellEndY = cellStartY + CELL_SIZE
    return [cellStartX, cellStartY, cellEndX, cellEndY]
}

function drawWall(centerRow, centerCol, orientation) {
    let bounds = getWallBounds(centerRow, centerCol, orientation)
    let length = bounds[2] - bounds[0]
    let width = bounds[3] - bounds[1]
    fill(50)
    rect(bounds[0], bounds[1], length, width, 5)
}

function getWallBounds(centerRow, centerCol, orientation) {
    let center = wallCoordsToPixels(centerRow, centerCol)
    let startX
    let startY
    let endX
    let endY
    if (orientation === WALL_HORIZONTAL) {
        startX = center[0] - (WALL_SIZE / 2)
        endX = center[0] + (WALL_SIZE / 2)
        startY = center[1] - (WALL_THICKNESS / 2)
        endY = center[1] + (WALL_THICKNESS / 2)
    } else {
        startX = center[0] - (WALL_THICKNESS / 2)
        endX = center[0] + (WALL_THICKNESS / 2)
        startY = center[1] - (WALL_SIZE / 2)
        endY = center[1] + (WALL_SIZE / 2)
    }
    return[startX, startY, endX, endY]
}

function wallCoordsToPixels(wallRow, wallCol) {
    let x = WALL_CENTER_START_X + (PAWN_SIZE * wallCol)
    let y = WALL_CENTER_START_Y - (PAWN_SIZE * wallRow)
    return [x, y]
}

function drawPawn(color, row, col) {
    let bounds = getCellBounds(row, col)
    drawPawnPixels(color, bounds[0], bounds[1])
}

function drawPawnPixels(color, pixelX, pixelY) {
    fill(color)
    square(pixelX,pixelY,40,40)
}


// WEBSOCKET

var socket;

function wsSetup() {
    socket = new WebSocket(`wss://final-project-group-5.glitch.me/:3000`);

    let roomCode = getRoomCode()
    console.log(roomCode)

    socket.onopen = function () {
        // Sending to server
        let data = {
            type: "connect"
        }
        if (roomCode !== null) {
            data["room"] = roomCode
            document.getElementById("room-code").innerText = roomCode
        } else {
            data["room"] = "none"
        }
        console.log(JSON.stringify(data))
        socket.send(JSON.stringify(data))
    };

    // Receiving from server
    socket.onmessage = function (message) {
        // content.innerHTML += message.data +'<br />';
        console.log(message.data)
        let json = JSON.parse(message.data)
        if (json.type === "game state") {
            document.getElementById("friend-join").setAttribute("hidden", "")
            console.log("Got game state")
            gameState = json.gameState
            gameSetup = true
        } else if (json.type === "invalid move") {
            renderInvalidMove = true
        } else if (json.type === "joined room") {
            document.getElementById("room-code").innerText = json.room
            let location = window.location.toString().split("?")[0]
            document.getElementById("friend-join").removeAttribute("hidden")
            document.getElementById("url").innerText= `${location}?code=${json.room}`
            document.getElementById("url").href = `${location}?code=${json.room}`
        }
    };

    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error.toString());
    };
}

function moveMyPawn(x, y) {
    socket.send(JSON.stringify({type:'move pawn', x: x, y: y}))
}

function placeWall(x, y, orientation){
    socket.send(JSON.stringify({type : 'place wall', x : x, y : y, orientation : orientation}))
}

function getRoomCode() {
    let queryString = window.location.search
    let urlParam = new URLSearchParams(queryString)
    if (urlParam.has("code")) {
        return urlParam.get("code")
    }
    return null
}
