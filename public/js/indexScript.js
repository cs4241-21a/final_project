

const getPos = function( event ) {
    cursorPosX = event.clientX - canvas.offsetLeft
    cursorPosY = event.clientY - canvas.offsetTop
}

const drawConst = function (event) {
    ctx.strokeStyle = 'black';
    ctx.beginPath()
    ctx.moveTo(cursorPosX, cursorPosY)
    getPos(event)
    ctx.lineTo(cursorPosX,cursorPosY)
    ctx.stroke()
}

//Constantly draws as the mouse moves 
document.addEventListener("mousemove",drawConst)
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let cursorPosX = 0
let cursorPosY = 0 






