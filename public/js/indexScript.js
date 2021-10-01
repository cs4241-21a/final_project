
//bool to keep track if the user is currently drawing 
let isDrawing = false

//keeps track of current drawing color 
let color = 'black'

//Saves the mouse position 
//TODO fix offset, this does not work when the screen is scrolled down 
const getPos = function( event ) {
    cursorPosX = event.clientX - canvas.offsetLeft
    cursorPosY = event.clientY - canvas.offsetTop
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
    ctx.beginPath()
    ctx.moveTo(cursorPosX, cursorPosY)
    getPos(event)
    ctx.lineTo(cursorPosX,cursorPosY)
    ctx.stroke()
    }
}

const colorSelected = function(event){
    color = document.querySelector( '#colorSelector').value
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
}


const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let cursorPosX = 0
let cursorPosY = 0 






