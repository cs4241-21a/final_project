
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
    let myCanvas = createCanvas(1000, 500);
    myCanvas.style('border', '1px solid #000')

    myCanvas.mousePressed(saveForUndo)
   
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
  
function draw() {
    if (mouseIsPressed) {
        //Check if in erase mode 
        const checkErase = document.querySelector('input[name="action"]:checked').value
        if(checkErase === "Erase"){   
            cursor(CROSS)
            erase()
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY)
        }
        else{
            cursor(ARROW)
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

function saveForUndo(){
    undoList.push(get())
}

const redo = function(event){
    if (redoList.length == 0) {
        return;
    }
    undoList.push(get())
    //Reset background and redraw the previous image 
    background(255);   
    image(redoList.pop(), 0, 0);
 }

const undo = function (event) {
    if (undoList.length == 0) {
        return;
    }
    redoList.push(get())
    //Reset background and redraw the previous image 
    background(255);
    image(undoList.pop(), 0, 0);
}
