
let color = 'black'
let lineWidth = 50
let undoList = []
let redoList = []
let connection

const changeColor = function(event){
    color = document.querySelector( '#colorSelector').value
}

const changeWidth = function(event){
   lineWidth = document.querySelector( '#lineWidth').value
}

function clearCanvas(){
    clear()
}

function setup() {
    let myCanvas = createCanvas(1000, 500)

    myCanvas.style('border', '1px solid #000')

    myCanvas.mouseReleased(saveForUndo)
    myCanvas.mousePressed(drawShapes)

    myCanvas.parent('canvas-container')

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
                //TODO fix on refresh draws a circle at location of the last line drawn 
                helpDrawLine(data.color, data.lineWidth, data.mX, data.mY, data.pmX, data.pmY)
            }
            else if (data.shape === "circle" || data.shape === "square" || data.shape == "triangle"){
                helpDrawShape(data.shape, data.isFilled, data.color, data.mX, data.mY, data.shapeSize)
            }
        }
    }
  }


function helpDrawLine(color, lineWidth, mouseX, mouseY, pmouseX, pmouseY){
    stroke(color)
    strokeWeight(lineWidth)
    line(mouseX, mouseY, pmouseX, pmouseY)
}

//TODO Color changed delayed by one click 
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
            erase()
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY)
        } else if (checkDrawType === "Draw") {
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
    noErase()
}

//Function for drawing shapes so it stamps only once
function drawShapes() {
    //keep track of undo
    undoList.push(get())

    //drawing shapes
    if (mouseIsPressed) {
        //Check which drawing mode it is in -> shapes get stamped
        const checkDrawType = document.querySelector('input[name="action"]:checked').value
        const checkFillShape = document.getElementById("fillShape").checked
        const shapeSize = document.getElementById("myRange").value
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
            helpDrawShape(shape, isFilled, color, mouseX, mouseY, shapeSize)
            let data = {
                shape: shape,
                isFilled: isFilled,
                color:color, 
                mX:mouseX, 
                mY:mouseY,
                shapeSize:shapeSize,
            }
            connection.send(JSON.stringify(data))
        }
    }//end if mousepressed
}





function saveForUndo(){
    undoList.push(get())
    //sendCanvasToServer()
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
