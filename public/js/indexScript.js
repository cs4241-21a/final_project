let color = 'black'
let lineWidth = 50
let connection
let myCanvas
let initImg;

const changeColor = function(event){
    color = document.querySelector( '#colorSelector').value
}

const changeWidth = function(event){
   lineWidth = document.querySelector( '#lineWidth').value
}

function clearCanvas(){
    clear()
    let data = {
        shape: "clear"
    }
    connection.send(JSON.stringify(data))
}

function preload() {
    initImg = loadImage('canvasState.png');
}

function setup() {
    myCanvas = createCanvas(1000, 500)
    myCanvas.style('border', '1px solid #000')
    myCanvas.mousePressed(drawShapes)
    myCanvas.parent('canvas-container')

    const colorSelector = document.querySelector( '#colorSelector')
    colorSelector.addEventListener('change', changeColor);

    const clearBtn = document.querySelector( '#clearBtn')
    clearBtn.onclick = clearCanvas

    const lineWidth = document.querySelector('#lineWidth')
    lineWidth.oninput = changeWidth

    image(initImg, 0, 0);
    connection = new WebSocket('ws://' + window.location.hostname + ':3323')

    connection.onmessage = e => {
        let data
        let failed = false
        try {
            data = JSON.parse(e.data)
        }catch (e){
            failed = true
            console.log(e.data, " is not JSON")
        }
        if (!failed){
            console.log(data.shape)
            if (data.shape === "line"){
                helpDrawLine(data.color, data.lineWidth, data.mX, data.mY, data.pmX, data.pmY)
            }
            else if (data.shape === "circle" || data.shape === "square" || data.shape == "triangle"){
                helpDrawShape(data.shape, data.isFilled, data.color, data.mX, data.mY, data.shapeSize)
            }
            else if (data.shape === "erase"){
                helpErase(data.lineWidth, data.mX, data.mY, data.pmX, data.pmY)
            }
            else if (data.shape === "clear"){
                clear()
            }
        }
    }
  }

function helpDrawLine(color, lineWidth, mouseX, mouseY, pmouseX, pmouseY){
    stroke(color)
    strokeWeight(lineWidth)
    line(mouseX, mouseY, pmouseX, pmouseY)
}

function helpErase(lineWidth, mouseX, mouseY, pmouseX, pmouseY){
    erase()
    strokeWeight(lineWidth)
    line(mouseX, mouseY, pmouseX, pmouseY)
    noErase()
}

function helpDrawShape(shape, isFilled, color, mouseX, mouseY, shapeSize){
    if (isFilled){
        fill(color)
        strokeWeight(0)
    } 
    else 
    {
        fill(0,0,0,0)
        stroke(color)
        strokeWeight(5)
    }
    if (shape === "circle"){
        circle(mouseX, mouseY, shapeSize)
    }
    else if (shape === "square"){
        square(mouseX - (shapeSize/2), mouseY - (shapeSize/2), shapeSize)
    }
    else if (shape == "triangle"){
        triangle(mouseX, mouseY+(1*(shapeSize/2)), mouseX-(1*(shapeSize/2)), mouseY-(1*(shapeSize/2)), mouseX+(1*(shapeSize/2)), mouseY-(1*(shapeSize/2)))
    }
}

function draw() {
    if (mouseIsPressed) {
        //Check which drawing mode it is in -> show up when draw or erase are checked
        const checkDrawType = document.querySelector('input[name="action"]:checked').value
        if(checkDrawType === "Erase"){
            cursor('https://icons.iconarchive.com/icons/pixture/stationary/32/Eraser-2-icon.png', 16, 16)  
            helpErase(lineWidth, mouseX, mouseY, pmouseX, pmouseY)
            let data = {
                shape: "erase", 
                mX: mouseX, 
                mY:mouseY, 
                pmX:pmouseX, 
                pmY:pmouseY, 
                lineWidth:lineWidth,
            }
            connection.send(JSON.stringify(data))
        } 
        else if (checkDrawType === "Draw") {
            cursor('https://icons.iconarchive.com/icons/custom-icon-design/flatastic-6/32/Brush-tool-icon.png', 16, 16)
            helpDrawLine(color, lineWidth, mouseX, mouseY, pmouseX, pmouseY)
            let data = {
                shape: "line",
                mX: mouseX,
                mY: mouseY, 
                pmX: pmouseX, 
                pmY: pmouseY, 
                color:color, 
                lineWidth:lineWidth,
            }
            connection.send(JSON.stringify(data))
        }
    } 
}

function mouseReleased() {
    sendImage()
}

//Function for drawing shapes so it stamps only once
function drawShapes() {
    if (mouseIsPressed) {
        //Check which drawing mode it is in -> shapes get stamped
        const checkDrawType = document.querySelector('input[name="action"]:checked').value
        const checkFillShape = document.getElementById("fillShape").checked
        const shapeSize = document.getElementById("myRange").value
        theColor = document.querySelector( '#colorSelector').value
        if(checkDrawType === "Circle" || checkDrawType === "Square" || checkDrawType === "Triangle"){
            cursor('grab')
            let shape;
            if (checkDrawType === "Circle"){
                shape = "circle"
            }
            else if (checkDrawType === "Square"){
                shape = "square"
            }
            else if (checkDrawType === "Triangle"){
                shape = "triangle"
            }
            isFilled = false 
            if(checkFillShape === true) {
                isFilled = true
            } 
            helpDrawShape(shape, isFilled, theColor, mouseX, mouseY, shapeSize)
            let data = {
                shape: shape,
                isFilled: isFilled,
                color:theColor, 
                mX:mouseX, 
                mY:mouseY,
                shapeSize:shapeSize,
            }
            connection.send(JSON.stringify(data))
        }
    }
    return false
}

function sendImage() {
    const base64img = myCanvas.elt.toDataURL();
    const obj = {
        img: base64img
    }
    const body = JSON.stringify(obj)
    console.log(base64img)
    fetch('/api/sendImage', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body
    })
}