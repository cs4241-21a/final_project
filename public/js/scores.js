function loadScores(info){
  var toPrint = document.createTextNode("");
  toPrint.textContent = info.username + ": " + info.score;
  document.body.appendChild(toPrint)
}

fetch("/getScores")
  .then(response => response.json())
  .then(getScores => {
    getScores.forEach(loadScores);
  });

