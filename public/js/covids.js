const numOfStars = 75,
      width = 750,
      height = 750,
      min_speed = .5,
      max_speed = 2,
      small = 22,
      medium = 40,
      large = 70,
      gompei_size = 50,
      mask_size = 22,
      ship_thrust = .05,
      max_ship_speed = 5,
      num_lives = 3

let GameOver = false
let isThrusting = false

let virus_img
let sanitizer_img
let mask_img
let gompei_img

let ship = {}
let stars = []
let masks = []

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateStar(){
  let star = {} //Define star locally
  const quad = randomChoice([0, 1, 2, 3])
  let x, y, dx, dy
  if (quad === 0) { //x greater
    x = random(width, width+(large*2))
    y = random(1, 500)
    dx = -random(min_speed,max_speed)
    dy = random(min_speed,max_speed)*randomChoice([-1, 1])
  } else if (quad === 1) { //y greater
    x = random(1, 500)
    y = random(height, height+(large*2))
    dx = random(min_speed,max_speed)*randomChoice([-1, 1])
    dy = -random(min_speed,max_speed)
  } else if (quad === 2) { //x less
    x = random(-1*(large*2), -1)
    y = random(1, 500)
    dx = random(min_speed,max_speed)
    dy = random(min_speed,max_speed)*randomChoice([-1, 1])
  } else if (quad === 3) {//y less
    x = random(1, 500)
    y = random(-1*(large*2), -1)
    dx = random(min_speed,max_speed)*randomChoice([-1, 1])
    dy = random(min_speed,max_speed)
  }

  star.x = x
  star.y = y
  star.dx = dx
  star.dy = dy

  star.init_x = x
  star.init_y = y

  star.inPlay = false

  const set = randomChoice([{life:1, size:small}, {life:2, size:medium}, {life:3, size:large}])
  star.diam = set.size
  star.lives = set.life
  stars.push(star) //Now add the star to the list
}

function generateStars(){
	for (let i = 0; i < numOfStars; i++) {
	    generateStar()
	}
}

function drawStars(){
  for (let i = 0; i < numOfStars; i++) {
    let rando_speedx = random(min_speed,max_speed)
    let rando_speedy = random(min_speed,max_speed)
    stars[i].x += randomChoice([stars[i].dx, rando_speedx, -rando_speedx])
    stars[i].y += randomChoice([stars[i].dy, rando_speedy, -rando_speedy])
    if ((stars[i].x <= width) && (stars[i].y <= height) && (stars[i].x >= 0) && (stars[i].y >= 0)) {
      stars[i].inPlay = true
    }
    if (stars[i].inPlay && ((stars[i].x >= width+(large*2)) || (stars[i].y >= height+(large*2)) || (stars[i].x <= -(large*2)) || (stars[i].y <= -(large*2)))) {
      stars[i].x = stars[i].init_x
      stars[i].y = stars[i].init_y
    }
    image(virus_img, stars[i].x, stars[i].y, stars[i].diam, stars[i].diam)
  }
}

function generateMask(){
  let mask = {}
  ship.pos = createVector(width/2, height/2);
  ship.vel = createVector(0, 0);
  ship.diam = mask_size
  ship.thrust = ship_thrust
  ship.rotation = 0
  
}

function generateShip() {
  ship.pos = createVector(width/2, height/2);
  ship.vel = createVector(0, 0);
  ship.diam = gompei_size
  ship.thrust = ship_thrust
  ship.rotation = 0
  ship.lives = num_lives
}

function turnShip() {
  if (keyIsDown(LEFT_ARROW)) {
    ship.rotation -= .1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.rotation += .1;
  }

}

function moveShip(){
  let acc = createVector(0,0)
  if(keyIsDown(UP_ARROW)){
    isThrusting = true
    acc = createVector(0, ship.thrust) //Add acceleration pointin along ship's axis (up)
    acc.rotate(ship.rotation) //Rotate by ship's rotation
  } else {
    isThrusting = false
  }
  ship.vel.add(acc)
  ship.pos.add(ship.vel)
}

function checkEdges(obj) {
  if (obj.pos.x < 0) {
    obj.pos.x = width;
  }
  if (obj.pos.x > width) {
    obj.pos.x = 0;
  }

  if (obj.pos.y < 0) {
    obj.pos.y = height;
  }
  if (obj.pos.y > height) {
    obj.pos.y = 0;
  }
}

function displayShip(){
  push();
  translate(ship.pos.x, ship.pos.y)
  rotate(ship.rotation)
  image(gompei_img, -25, -25, ship.diam, ship.diam)
  pop();
}

function blinkShip(counter){
  if (counter % 30 === 0) {
    
  }
}

function checkShipForCollisions(curr, targets){
  
  //Note this will crash if the target object does not contain a 'pos' vector.
  for (let i = 0; i < targets.length; i++){
    let t = targets[i];
    let distance = dist(curr.pos.x, curr.pos.y, t.x, t.y);

    let sumOfRadii = curr.diam/2 + t.diam/2;

    if(sumOfRadii > distance){
      //We have a collision!
      print("HIT")
      //play audio
    }
  }
}

function setup() {
  createCanvas(750, 750) //make the size of the display whatever size the window is
  generateStars()
  generateShip()
  virus_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fcoronavirus.png?v=1633701999099')
  sanitizer_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fhand-sanitizer.png?v=1633702007208')
  mask_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fmedical-mask.png?v=1633702003055')
  gompei_img = loadImage('https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fgoat%20(1).png?v=1633701995373')
  
  connectWS();
}

function thrustingFeedback(){
  
}

function lossOfLife(){
  
}

function checkLives(){
  if (ship.lives === 0){
    GameOver = true
  }
}

let counter = 0
function draw() {
  if (counter >= 60) {
    counter = 0
  }
  background(255)
  drawStars()
  displayShip()
  turnShip()
  moveShip()
  checkShipForCollisions(ship, stars)
  checkShipForCollisions(masks, stars)
  checkEdges(ship)
  checkLives()
  if(GameOver){
    return
  }
  counter++
}


let socket = null;
let inLobby = false;

function connectWS(){
  socket = new WebSocket("wss://corona-game.glitch.me");
  socket.onmessage = function (event) {
    console.log("[SERVER] " + event.data);
    try {
      let json = JSON.parse(event.data);
      switch(json.packetType) {
        case "joined_lobby":
          {
            inLobby = true;
          }
          break;
      }
    }catch(e){}
  }
}

function joinLobby(name, password=undefined){
  socket.send(JSON.stringify({packetType: "join_lobby", name, password}));
}

function sendShipPos() {
  socket.send(JSON.stringify({packetType: "update_pos", x: ship.pos.x, y: ship.pos.y, vx: ship.vel.x, vy: ship.vel.y, angle: ship.rotation }));
}

setInterval(tickWS, 250);
function tickWS(){
  if(inLobby) {
    sendShipPos();
  }
}