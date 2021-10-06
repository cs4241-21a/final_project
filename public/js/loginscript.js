

//login functions
const login = function(e) {
  e.preventDefault();

  const username = document.querySelector("#uname"),
    password = document.querySelector("#pword");

  if (username.value === "" || password.value === "") {
    alert("Enter a valid username and password");
    return false;
  }

  let json = { username: username.value, password: password.value },
    body = JSON.stringify(json);

  fetch("/login", {
    method: "POST",
    body: body,
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(user => {
      if (user.length == 0) {
        alert("Username or password is incorrect");
      } else {
        window.location.href = "views/snake.html";
      }
    });
  return false;
};

const register = function(e) {
  e.preventDefault();

  const username = document.getElementById("uname"),
    password = document.getElementById("pword");

  if (username.value === "" || password.value === "") {
    alert("Enter a valid username and password");
    return false;
  }

  let json = { username: username.value, password: password.value },
    body = JSON.stringify(json);

  fetch("/register", {
    method: "POST",
    body: body,
    headers: { "Content-Type": "application/json" }
  }).then(response => response.json());
  window.location.href = "snake.html";
};

// fun background
var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.width = 2700;
can.height = 2700;
var img = new Image();
img.src = "https://cdn.glitch.me/ef24414d-2e2b-4125-b2ec-662f19e66c6e%2FcoviBackground.png?v=1633552358358";
  
   var imgHeight = 0;
   var speed = 2;
  
  function loop()
  {
    ctx.drawImage(img, 0, imgHeight);
    ctx.drawImage(img, 0, imgHeight - can.height);
  
    imgHeight += speed;
                
    if(imgHeight == can.height)
      imgHeight = 0;
      window.requestAnimationFrame(loop);
      
   }
  loop();

window.onload = function() {
  // login
  const loginBtn = document.getElementById("loginButton");
  loginBtn.onclick = login;

  const signUpBtn = document.getElementById("registerButton");
  signUpBtn.onclick = register;
  
   
};
