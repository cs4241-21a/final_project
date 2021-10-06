const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

var nodes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function move(e) {
    if (e.buttons)
        if (!lastPoint) {
            lastPoint = { x: e.offsetX, y: e.offsetY };
            return;
        }
        context.beginPath();
        context.moveTo(lastPoint.x, lastPoint.y);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = 'green';
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.stroke();
        lastPoint = { x: e.offsetX, y: e.offsetY };
    }
}

function key(e) {
    if (e.key === 'Backspace') {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

window.onkeydown = key;

window.onmousemove = move;

window.onresize = resize;
resize();