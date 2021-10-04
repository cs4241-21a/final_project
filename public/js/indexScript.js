
let color = 'black'
let lineWidth = 50
let eraseMode = false

const changeColor = function(event){
    color = document.querySelector( '#colorSelector').value
}

const changeWidth = function(event){
    console.log(lineWidth)
    lineWidth = document.querySelector( '#lineWidth').value
}

function setup() {
    createCanvas(1000, 500);

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
        if(checkErase === "Erase"){   //Todo change cursor to change area 
            erase()
            ellipse(mouseX, mouseY, lineWidth, lineWidth);
       }
        else{
            stroke(color)
            fill(color)
            ellipse(mouseX, mouseY, lineWidth, lineWidth);
       }
    } 
    noErase()
  }

  function clearCanvas(){
      clear()
  }


