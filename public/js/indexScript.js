
let color = 'black'
let lineWidth = 50
let eraseMode = false
let history = []

const changeColor = function(event){
    color = document.querySelector( '#colorSelector').value
}

const changeWidth = function(event){
   lineWidth = document.querySelector( '#lineWidth').value
}

function setup() {
    let myCanvas = createCanvas(1000, 500);
    myCanvas.style('border', '1px solid #000')
   
    const colorSelector = document.querySelector( '#colorSelector')
    colorSelector.addEventListener('change', changeColor);

    const clearBtn = document.querySelector( '#clearBtn')
    clearBtn.onclick = clearCanvas

    const lineWidth = document.querySelector('#lineWidth')
    lineWidth.onclick = changeWidth
  }
  
function draw() {
    if (mouseIsPressed) {
        //Check if in erase mode 
        const checkErase = document.querySelector('input[name="action"]:checked').value
        if(checkErase === "Erase"){   
            cursor(CROSS)
            erase()
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
        else{
            cursor(ARROW)
            stroke(color)
            strokeWeight(lineWidth)
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
    } 
    noErase()
}

function clearCanvas(){
    clear()
}

function mousePressed() {
    //TODO fix to doesn't include mouse actions that aren't drawing such as to change the color
    history.push(get())
}

function keyPressed(e) {
    //check if 'z' and ctrl/cmd clicked 
    if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
        undo();
    }
}
  
function undo() {
    if (history.length == 0) {
        return;
    }
    //Reset background and redraw the previous image 
    background(255);
    image(history.pop(), 0, 0);
}
