let stars = []	//create empty list of stars
let numOfStars = 20

let width = 500
let height = 500

let small = 22
let medium = 37
let large = 55

let virus_img
let sanitizer_img
let mask_img
let gompei_img

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateStars(){
	for (let i = 0; i < numOfStars; i++) {
	    let star = {} //Define star locally
      const quad = randomChoice([0, 1, 2, 3])
      let x, y
      if (quad === 0) { //x greater
        x = random(500, 600)
        y = random(0, 500)
      } else if (quad === 1) { //y greater
        x = random(0, 500)
        y = random(500, 600)
      } else if (quad === 2) { //x less
        x = random(-100, 0)
        y = random(0, 500)
      } else if (quad === 3) {//y less
        x = random(0, 500)
        y = random(-100, 0)
      }
      
      star.x = x
      star.y = y
    
      star.init_x = x
      star.init_y = y
      
      star.inPlay = false
    
      const speed = randomChoice([-1, -2])
    
      star.dx = speed*Math.sign(x)
      star.dy = speed*Math.sign(y)
      
      const set = randomChoice([{life:1, size:small}, {life:2, size:medium}, {life:3, size:large}])
	    star.diam = set.size
      star.lives = set.life
	    stars.push(star) //Now add the star to the list
	}
}


function drawStars(){
  for (let i = 0; i < numOfStars; i++) {
    stars[i].x += randomChoice([stars[i].dx, 0])
    stars[i].y += randomChoice([stars[i].dy, 0])
    if ((stars[i].x <= width) && (stars[i].y <= height) && (stars[i].x >= 0) && (stars[i].y >= 0)) {
      stars[i].inPlay = true
    }
    if (stars[i].inPlay && ((stars[i].x >= width+50) || (stars[i].y >= height+50) || (stars[i].x <= -50) || (stars[i].y <= -50))) {
      stars[i].x = stars[i].init_x
      stars[i].y = stars[i].init_y
    }
    image(virus_img, stars[i].x, stars[i].y, stars[i].diam, stars[i].diam)
  }
}

function setup() {
  createCanvas(500, 500) //make the size of the display whatever size the window is
  generateStars()
  virus_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fcoronavirus.png?v=1633701999099')
  sanitizer_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fhand-sanitizer.png?v=1633702007208')
  mask_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fmedical-mask.png?v=1633702003055')
  gompei_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fgoat%20(1).png?v=1633701995373')

}

function draw() {
  background(255)
  stroke(255)
  strokeWeight(3)
  drawStars()
}

