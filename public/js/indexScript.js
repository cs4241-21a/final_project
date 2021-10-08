
let color = 'black'
let lineWidth = 50
let eraseMode = false
let undoList = []
let redoList = []
let undoCounter = 0
let connection

const changeColor = function(event){
    color = document.querySelector( '#colorSelector').value
}

const changeWidth = function(event){
   lineWidth = document.querySelector( '#lineWidth').value
}

function setup() {

    //let myCanvas = createCanvas(windowWidth, windowHeight)
    let myCanvas = createCanvas(1000, 500)

    myCanvas.style('border', '1px solid #000')

    myCanvas.mouseReleased(saveForUndo)

    const colorSelector = document.querySelector( '#colorSelector')
    colorSelector.addEventListener('change', changeColor);

    const clearBtn = document.querySelector( '#clearBtn')
    clearBtn.onclick = clearCanvas

    const lineWidth = document.querySelector('#lineWidth')
    lineWidth.onclick = changeWidth

    const undoBtn = document.querySelector('#undoBtn')
    undoBtn.onclick = undo
    const redoBtn = document.querySelector('#redoBtn')
    redoBtn.onclick = redo

    connection = new WebSocket('ws://localhost:3323')

    connection.onmessage = e => {
        // console.log(e.data)
        let data
        let failed = false
        try {
            data = JSON.parse(e.data)
        }catch (e){
            failed = true
            console.log(e.data, " is not JSON")
        }
        if (!failed){
            console.log("Got canvas of size (", data.width, ", ", data.height, ") from the server!")
            loadCanvasFromServer(data)
        }
    }
  }
  
function draw() {
    if (mouseIsPressed) {
        //Check if in erase mode 
        const checkErase = document.querySelector('input[name="action"]:checked').value
        if(checkErase === "Erase"){
            cursor('https://icons.iconarchive.com/icons/pixture/stationary/32/Eraser-2-icon.png', 16, 16)
            erase()
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY)
        }
        else {
            cursor('https://icons.iconarchive.com/icons/custom-icon-design/flatastic-6/32/Brush-tool-icon.png', 16, 16)
            stroke(color)
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY)
        }

    } 
    noErase()
}

function clearCanvas(){
    clear()
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}

function saveForUndo(){
    undoList.push(get())
    sendCanvasToServer()
}

function sendCanvasToServer(){
    let canvas = get()
    canvas.loadPixels()
    // console.log(canvas.width, canvas.height)
    let data = {
        width: canvas.width,
        height: canvas.height,
        pixels: canvas.pixels
    }

    connection.send(JSON.stringify(data))
}

function loadCanvasFromServer(canvas){
    // console.log(canvas)
    let myImage = get()
    myImage.loadPixels()
    // myImage.pixels = canvas.pixels
    for (let i = 0; i < myImage.pixels.length; i++){
        myImage.pixels[i] = canvas.pixels[i]
    }
    myImage.updatePixels()
    image(myImage, 0, 0, canvas.width, canvas.height)
}

const redo = function(event){
    if (redoList.length == 0) {
        return
    }
    undoList.push(get())
    //Reset background and redraw the previous image
    background(255)
    image(redoList.pop(), 0, 0);
 }

const undo = function (event) {
    if (undoList.length == 0) {
        return
    }
    undoCounter ++
    redoList.push(get())
    //Reset background and redraw the previous image
    background(255)
    image(undoList.pop(), 0, 0)
}
