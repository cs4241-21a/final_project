
let color = 'black'
let lineWidth = 50
let eraseMode = false
let undoList = []
let redoList = []

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

    myCanvas.mousePressed(drawShapes)
   
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
  }

//Function for drawing and erasing so the lines are continuous
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
            stroke(color)
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY)
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
        if (checkDrawType === "Circle") {
            cursor('grab')
            if(checkFillShape === true) {
                fill(color)
                strokeWeight(0)
            } else {
                fill("white")
                stroke(color)
                strokeWeight(5)
            }
            circle(mouseX, mouseY, shapeSize)
        } else if (checkDrawType === "Square") {
            cursor('grab')
            if(checkFillShape === true) {
                fill(color)
                strokeWeight(0)
            } else {
                fill("white")
                stroke(color)
                strokeWeight(5)
            }
            square(mouseX - (shapeSize/2), mouseY - (shapeSize/2), shapeSize)
        } else if (checkDrawType === "Triangle") {
            cursor('grab')
            if(checkFillShape === true) {
                fill(color)
                strokeWeight(0)
            } else {
                fill("white")
                stroke(color)
                strokeWeight(5)
            }
            triangle(mouseX, mouseY+(1*(shapeSize/2)), mouseX-(1*(shapeSize/2)), mouseY-(1*(shapeSize/2)), mouseX+(1*(shapeSize/2)), mouseY-(1*(shapeSize/2)))
        }
    } 
    noErase()
}

function clearCanvas(){
    clear()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
    redoList.push(get())
    //Reset background and redraw the previous image 
    background(255)
    image(undoList.pop(), 0, 0)
}
