const numOfStars = 25,
  width = 750,
  height = 750,
  min_speed = 0.5,
  max_speed = 2,
  small = 22,
  medium = 40,
  large = 70,
  gompei_size = 50,
  mask_size = 25,
  ship_thrust = 0.05,
  max_ship_speed = 5,
  num_lives = 3;

let GameOver = false;
let isThrusting = false;
let cantShoot = false;

let virus_img;
let sanitizer_img;
let mask_img;
let gompei_img;

let ship = {};
let stars = [];
let masks = [];

let otherShips = {};

let isControllerClient = true;
let controllerClientTimeout = null;

let score = 0;

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let _star_cur_id = 0;
function generateStar() {
  let star = {}; //Define star locally
  const quad = randomChoice([0, 1, 2, 3]);
  let x, y, dx, dy;
  if (quad === 0) {
    //x greater
    x = random(width, width + large * 2);
    y = random(1, 500);
    dx = -random(min_speed, max_speed);
    dy = random(min_speed, max_speed) * randomChoice([-1, 1]);
  } else if (quad === 1) {
    //y greater
    x = random(1, 500);
    y = random(height, height + large * 2);
    dx = random(min_speed, max_speed) * randomChoice([-1, 1]);
    dy = -random(min_speed, max_speed);
  } else if (quad === 2) {
    //x less
    x = random(-1 * (large * 2), -1);
    y = random(1, 500);
    dx = random(min_speed, max_speed);
    dy = random(min_speed, max_speed) * randomChoice([-1, 1]);
  } else if (quad === 3) {
    //y less
    x = random(1, 500);
    y = random(-1 * (large * 2), -1);
    dx = random(min_speed, max_speed) * randomChoice([-1, 1]);
    dy = random(min_speed, max_speed);
  }

  star.x = x;
  star.y = y;
  star.dx = dx;
  star.dy = dy;

  star.init_x = x;
  star.init_y = y;

  star.inPlay = false;

  const set = randomChoice([
    { life: 1, size: small },
    { life: 2, size: medium },
    { life: 3, size: large }
  ]);
  star.diam = set.size;
  star.lives = set.life;

  star.id = _star_cur_id++;

  stars.push(star); //Now add the star to the list
}

function generateStars() {
  for (let i = 0; i < numOfStars; i++) {
    generateStar();
  }
}

function drawStars() {
  for (let i = 0; i < numOfStars; i++) {
    let rando_speedx = random(min_speed, max_speed);
    let rando_speedy = random(min_speed, max_speed);
    if (isControllerClient) {
      stars[i].x += randomChoice([stars[i].dx, rando_speedx, -rando_speedx]);
      stars[i].y += randomChoice([stars[i].dy, rando_speedy, -rando_speedy]);
    } else {
      // average it a couple times so its a bit smoother
      // (since this client isn't the controller, the randoms are desynced from the actual controller client)
      const num_iter = 2;
      for (let it = 0; it < num_iter; it++) {
        stars[i].x +=
          randomChoice([stars[i].dx, rando_speedx, -rando_speedx]) / num_iter;
        stars[i].y +=
          randomChoice([stars[i].dy, rando_speedy, -rando_speedy]) / num_iter;
      }
    }
    if (
      stars[i].x <= width &&
      stars[i].y <= height &&
      stars[i].x >= 0 &&
      stars[i].y >= 0
    ) {
      stars[i].inPlay = true;
    }
    if (
      stars[i].inPlay &&
      (stars[i].x >= width + large * 2 ||
        stars[i].y >= height + large * 2 ||
        stars[i].x <= -(large * 2) ||
        stars[i].y <= -(large * 2))
    ) {
      stars[i].x = stars[i].init_x;
      stars[i].y = stars[i].init_y;
    }
    image(
      virus_img,
      stars[i].x - stars[i].diam / 2,
      stars[i].y - stars[i].diam / 2,
      stars[i].diam,
      stars[i].diam
    );
  }
}

function generateMask() {
  let mask = {};
  let boost = createVector(0, 4);
  boost.rotate(ship.rotation);
  let newVel = createVector(ship.vel.x / 2, ship.vel.y / 2);
  let newPos = createVector(0, 50);
  newPos.rotate(ship.rotation);
  newPos.add(ship.pos);
  newVel.add(boost);
  mask.vel = createVector(newVel.x, newVel.y);
  mask.pos = createVector(newPos.x, newPos.y);
  mask.diam = mask_size;
  mask.rotation = 0;
  return mask;
}

function generateShip() {
  let sh = {};
  sh.pos = createVector(width / 2, height / 2);
  sh.vel = createVector(0, 0);
  sh.diam = gompei_size;
  sh.thrust = ship_thrust;
  sh.rotation = 0;
  sh.desRot = 0;
  sh.lives = num_lives;
  sh.iframes = 0;
  return sh;
}

function turnShip() {
  if (keyIsDown(LEFT_ARROW)) {
    ship.rotation -= 0.1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.rotation += 0.1;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    print("SPACE");
    if (!cantShoot){
      let mask = generateMask();
      masks.push(mask);
      if (inLobby){
        socket.send(
          JSON.stringify({
            packetType: "add_mask",
            x: mask.pos.x,
            y: mask.pos.y,
            vx: mask.vel.x,
            vy: mask.vel.y
          })
        );
      }
    }
  }
}

function moveShip() {
  let acc = createVector(0, 0);
  if (keyIsDown(UP_ARROW) && !GameOver) {
    isThrusting = true;
    acc = createVector(0, ship.thrust); //Add acceleration pointin along ship's axis (up)
    acc.rotate(ship.rotation); //Rotate by ship's rotation
  } else {
    isThrusting = false;
  }
  ship.vel.add(acc);

  acc = createVector(0, 0);
  if (keyIsDown(DOWN_ARROW) && !GameOver) {
    acc = createVector(0, -ship.thrust / 2); //Add acceleration pointin along ship's axis (up)
    acc.rotate(ship.rotation); //Rotate by ship's rotation
  }
  ship.vel.add(acc);

  ship.pos.add(ship.vel);
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

function checkMaskEdges() {
  for (let i = masks.length-1; i >= 0 ;i--){
    if ((masks[i].pos.x < 0)||(masks[i].pos.x > width)||(masks[i].pos.y < 0)||(masks[i].pos.y > height)) {
      for (let i = masks.length-1; i >= 0 ;i--){
        
      }
    }
  }
}

function displayShip(obj = ship) {
  push();
  translate(obj.pos.x, obj.pos.y);
  if (obj.username) {
    textAlign(CENTER);
    text(obj.username, 0, -30);
  }
  rotate(obj.rotation);
  if (obj.iframes % 4 < 3 || (obj.lives <= 0 && counter % 8 < 2)) {
    // avoiding tint since it seems to cause memory problems
    image(gompei_img, -25, -25, obj.diam, obj.diam);
  }
  pop();
}

function displayMasks(objs = masks) {
  //look into image p5 rotation
  for (let i = 0; i < objs.length; i++) {
    push();
    translate(objs[i].pos.x, objs[i].pos.y);
    rotate(i + ((new Date().getTime() / 200) % (2 * Math.PI)));
    image(mask_img, -12, -12, objs[i].diam, objs[i].diam);
    pop();
  }
}

function moveMasks(objs = masks) {
  for (let i = 0; i < objs.length; i++) {
    objs[i].pos.x += objs[i].vel.x;
    objs[i].pos.y += objs[i].vel.y;
  }
}

function controlNumMasks() {
  if (masks.length >= 5) {
    cantShoot = true;
  } else {
    cantShoot = false;
  }
}

function checkMasksForCollisions() {
  masks = masks.filter((m, i) => {
    let hit = checkForCollisions(m, stars, "");
    if (hit !== null) {
      if (inLobby)
        socket.send(JSON.stringify({ packetType: "remove_mask", index: i }));
      if (inLobby && !isControllerClient)
        socket.send(JSON.stringify({ packetType: "hit_virus", id: hit.id }));
      masks.length--
      damageVirus(hit);
      score += 10;
      return false;
    }
    return true;
  });
}

function damageVirus(v) {
  v.lives--;
  if (v.lives > 0) {
    v.diam = [small, medium, large][v.lives - 1];
  } else {
    v.x = v.init_x;
    v.y = v.init_y;
    const set = randomChoice([
      { life: 1, size: small },
      { life: 2, size: medium },
      { life: 3, size: large }
    ]);
    v.diam = set.size;
    v.lives = set.life;
  }
}

function checkForCollisions(curr, targets) {
  //Note this will crash if the target object does not contain a 'pos' vector.
  for (let i = 0; i < targets.length; i++) {
    let t = targets[i];
    let distance = dist(curr.pos.x, curr.pos.y, t.x, t.y);

    let sumOfRadii = curr.diam / 2 + t.diam / 2;

    if (sumOfRadii > distance) {
      //We have a collision!
      print("HIT");
      //play audio
      return t;
    }
  }
  return null;
}

function setup() {
  frameRate(60);
  createCanvas(750, 750); //make display constant to preserve usability for multiplayer
  generateStars();
  ship = generateShip();
  virus_img = loadImage(
    "https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fcoronavirus.png?v=1633701999099"
  );
  sanitizer_img = loadImage(
    "https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fhand-sanitizer.png?v=1633702007208"
  );
  mask_img = loadImage(
    "https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fmedical-mask.png?v=1633702003055"
  );
  gompei_img = loadImage(
    "https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2Fgoat%20(1).png?v=1633701995373"
  );

  connectWS();
}

function thrustingFeedback() {}

function lossOfLife() {}

function checkLives() {
  if (ship.lives <= 0) {
    GameOver = true;
  } else if (ship.lives === 2) {
    image(gompei_img, 0, 30, 35, 35);
    image(gompei_img, 40, 30, 35, 35);
  } else if (ship.lives === 1) {
    image(gompei_img, 0, 30, 35, 35);
  } else {
    image(gompei_img, 0, 30, 35, 35);
    image(gompei_img, 40, 30, 35, 35);
    image(gompei_img, 80, 30, 35, 35);
  }
}

let counter = 0;
function draw() {
  if (counter >= 60) {
    counter = 0;
    score++;
  }
  counter++;
  background(255);
  drawStars();
  displayShip();
  for (let [k, v] of Object.entries(otherShips)) {
    displayShip(v);
    v.pos.add(v.vel);
    v.rotation += (v.desRot - v.rotation) * 0.3;
    if (v.iframes > 0) v.iframes--;
  }
  moveShip();
  if (!GameOver) {
    turnShip();
    //shoot()
    let hit = checkForCollisions(ship, stars);
    if (hit !== null && ship.iframes <= 0) {
      console.log("HIT SHIP");
      ship.lives--;

      if (ship.lives === 0) {
        const json = { score: score },
          body = JSON.stringify(json);
        
        fetch("/addScore", {
          method: "POST",
          body: body,
          headers: { "Content-Type": "application/json" }
        });
      }

      if (inLobby && !isControllerClient)
        socket.send(JSON.stringify({ packetType: "clear_virus", id: hit.id }));
      let v = hit;
      v.x = v.init_x;
      v.y = v.init_y;
      const set = randomChoice([
        { life: 1, size: small },
        { life: 2, size: medium },
        { life: 3, size: large }
      ]);
      v.diam = set.size;
      v.lives = set.life;

      ship.iframes = 120;
    }
    if (ship.iframes > 0) {
      ship.iframes--;
    }
  }
  checkEdges(ship);
  checkLives();
  checkMaskEdges();
  controlNumMasks();
  moveMasks();
  checkMasksForCollisions();
  displayMasks();
  for (let [k, v] of Object.entries(otherShips)) {
    moveMasks(v.masks);
    displayMasks(v.masks);
  }
  textAlign(LEFT);
  text("SCORE: " + score, 5, 14);
  if (GameOver) {
    print("Game Over");
    textAlign(CENTER);
    text("GAME OVER", 750 / 2, 750 / 2);
    return;
  }
}

let socket = null;
let inLobby = false;
let gotLoggedOutWarning = false;

document.querySelector("#lobbyButton").onclick = e => {
  joinLobby(
    document.querySelector("#lobbyname").value,
    document.querySelector("#lobbypass").value == ""
      ? undefined
      : document.querySelector("#lobbypass").value
  );
};

function connectWS() {
  socket = new WebSocket("wss://corona-game.glitch.me");
  socket.onmessage = function(event) {
    try {
      let json = JSON.parse(event.data);
      switch (json.packetType) {
        case "not_logged_in":
          {
            document.querySelector("#status").innerText =
              "Disconnected (not logged in)";
            document.querySelector(
              "#lobbyname"
            ).disabled = document.querySelector(
              "#lobbypass"
            ).disabled = document.querySelector("#lobbyButton").disabled = true;
            gotLoggedOutWarning = true;
            if (
              confirm(
                "You are not logged in, so multiplayer will be unavailable.\nClick OK to go back to the login page, or Cancel to continue playing offline."
              )
            ) {
              window.location = window.location.origin;
            }
          }
          break;
        case "joined_lobby":
          {
            inLobby = true;
            document.querySelector(
              "#lobbyname"
            ).disabled = document.querySelector(
              "#lobbypass"
            ).disabled = document.querySelector(
              "#lobbyButton"
            ).disabled = inLobby;
            isControllerClient = false;
            document.querySelector("#status").innerText = "Connected to Lobby";
          }
          break;
        case "send_field":
          {
            socket.send(JSON.stringify({ packetType: "send_field", stars }));
            isControllerClient = true;
            clearTimeout(controllerClientTimeout);
            controllerClientTimeout = setTimeout(() => {
              isControllerClient = false;
              document.querySelector("#status").innerText =
                "Connected to Lobby";
            }, 1000);
            document.querySelector("#status").innerText =
              "Connected to Lobby (Host)";
          }
          break;
        case "update_viruses":
          {
            json.viruses.forEach(v => {
              let st = stars.find(s => s.id == v.id);
              if (st !== undefined) {
                st.x = v.x;
                st.y = v.y;
                st.dx = v.dx;
                st.dy = v.dy;
                st.init_x = v.init_x;
                st.init_y = v.init_y;
                st.inPlay = v.inPlay;
                st.diam = v.diam;
                st.lives = v.lives;
              }
            });
          }
          break;
        case "joined":
          {
            let sh = generateShip();
            sh.username = json.username;
            sh.masks = [];
            otherShips[json.id] = sh;
          }
          break;
        case "update_player":
          {
            otherShips[json.id].pos.x = json.x;
            otherShips[json.id].pos.y = json.y;
            otherShips[json.id].vel.x = json.vx;
            otherShips[json.id].vel.y = json.vy;
            otherShips[json.id].desRot = json.angle;
            otherShips[json.id].lives = json.lives;
            otherShips[json.id].iframes = json.iframes;
          }
          break;
        case "add_mask":
          {
            let mask = generateMask();
            mask.pos.x = json.x;
            mask.pos.y = json.y;
            mask.vel.x = json.vx;
            mask.vel.y = json.vy;
            otherShips[json.cid].masks.push(mask);
          }
          break;
        case "remove_mask":
          {
            otherShips[json.cid].masks.splice(json.index, 1); // remove at index
          }
          break;
        case "hit_virus":
          {
            let v = stars.find(s => s.id == json.id);
            if (v !== undefined) damageVirus(v);
          }
          break;
        case "clear_virus":
          {
            let v = stars.find(s => s.id == json.id);
            if (v !== undefined) {
              v.x = v.init_x;
              v.y = v.init_y;
              const set = randomChoice([
                { life: 1, size: small },
                { life: 2, size: medium },
                { life: 3, size: large }
              ]);
              v.diam = set.size;
              v.lives = set.life;
            }
          }
          break;
      }
    } catch (e) {
      console.log("[SERVER] " + event.data);
    }
  };
  socket.onclose = e => {
    socket = null;
    inLobby = false;
    if (!gotLoggedOutWarning) {
      document.querySelector("#status").innerText = "Disconnected";
      setTimeout(connectWS(), 2000);
    }
  };
}

function joinLobby(name, password = undefined) {
  socket.send(JSON.stringify({ packetType: "join_lobby", name, password }));
}

function sendShipPos() {
  socket.send(
    JSON.stringify({
      packetType: "update_pos",
      x: ship.pos.x,
      y: ship.pos.y,
      vx: ship.vel.x,
      vy: ship.vel.y,
      angle: ship.rotation,
      lives: ship.lives,
      iframes: ship.iframes
    })
  );
}

setInterval(tickWS, 120);
function tickWS() {
  if (inLobby) {
    sendShipPos();
  }
}
