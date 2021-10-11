function loadScores(info){
  let str = ""
  history.forEach((item) => str += "<li>" + item + "</li>")
  document.getElementById("prevlist").innerHTML = str
  document.getElementById("prevlist").className = "nes-list"
  var toPrint = document.createTextNode("");
  toPrint.textContent = info.username + ": " + info.score + " | ";
  document.body.appendChild(toPrint)
}

fetch("/getScores")
  .then(response => response.json())
  .then(getScores => {
    getScores.forEach(loadScores);
  });

