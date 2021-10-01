
//bool to keep track if the user is currently drawing 
let isDrawing = false
let color = 'black'
lineWidth = 3 
let eraseMode = false

//Saves the mouse position 
const getPos = function( event ) {
    const canvas = document.querySelector('#canvas');
    const rect = canvas.getBoundingClientRect()
    cursorPosX = event.clientX - rect.left 
    cursorPosY = event.clientY - rect.top 
}

//Signals to start drawing 
const startDraw = function(event) {
    isDrawing = true
    getPos(event) 
}

//Signals to stop drawing 
const stopDraw = function(event){
    isDrawing = false
}

//Draws a line as the mouse moves when the mouse is pressed 
const draw = function(event){
    if (isDrawing === false){
        return 
    }
    else {
    ctx.strokeStyle = color //'black';

    const checkErase = document.querySelector('input[name="action"]:checked').value
    if(checkErase === "Erase"){  
        ctx.strokeStyle = 'white'
    }

    console.log(lineWidth)
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(cursorPosX, cursorPosY) 
    getPos(event)
    ctx.lineTo(cursorPosX,cursorPosY) // Possibly use a different shape like a circle or a square 
    ctx.stroke()
    }
}

const colorSelected = function(event){
    color = document.querySelector( '#colorSelector').value
}

const changeWidth = function(event){
    console.log(lineWidth)
    lineWidth = document.querySelector( '#lineWidth').value
}

const clear = function(event){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Assigns methods to mouse events 
window.onload = function() {
    document.addEventListener('mousedown', startDraw)
    document.addEventListener('mousemove',draw) 
    document.addEventListener('mouseup', stopDraw)

    const colorSelector = document.querySelector( '#colorSelector')
    colorSelector.addEventListener('change', colorSelected);

    const clearBtn = document.querySelector( '#clearBtn')
    clearBtn.onclick = clear

    const lineWidth = document.querySelector('#lineWidth')
    lineWidth.onclick = changeWidth
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let cursorPosX = 0
let cursorPosY = 0 






