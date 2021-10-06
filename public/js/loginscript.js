// fun background
var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
can.width = 600;
can.height = 600;
var img = new Image();
img.src = "coviBackgound.png";
   

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

window.onload = function() {
  const loginBtn = document.getElementById("loginButton");
  loginBtn.onclick = login;

  const signUpBtn = document.getElementById("registerButton");
  signUpBtn.onclick = register;
};
