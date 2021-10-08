let stars = []	//create empty list of stars
let numOfStars = 15

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
	    star.x = random(500, 600) //Add info as before
	    star.y = random(500, 560)
      const set = randomChoice([{life:1, size:small}, {life:2, size:medium}, {life:3, size:large}])
	    star.diam = set.size
      star.lives = set.life
	    stars.push(star) //Now add the star to the list
	}
}

function drawStars(){
  for (let i = 0; i < numOfStars; i++) {
    stars[i].x += randomChoice([-3, -1, 0, 1, 3])
    stars[i].y += randomChoice([-3, -1, 0, 1, 3])
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

