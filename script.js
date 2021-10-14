var MemeTitle = document.getElementsByClassName("memeTitle");
var KnowYourMeme = document.getElementsByClassName("KYMurl");
var Summary = document.getElementsByClassName("summary");

var Ex1Url = document.getElementsByClassName("");
var Ex2Url = document.getElementsByClassName("");

var Upvotes = document.getElementsByClassName("");
var Downvotes = document.getElementsByClassName("");
var Funny = document.getElementsByClassName("");
var FunnyNo = document.getElementsByClassName("");

function submit(e) {
  e.preventDefault();

  const userReq = document.querySelector("memeSearchForm").value;

  const json = {
    userReq
  };

  const body = JSON.stringify(json);

  fetch("/submit", { method: "POST", body })
    .then(() => requestData())
    .catch(err => {
      alert("Error:", err);
    });
}

function requestData() {
  fetch("/getData", { method: "POST", body: "" })
    .then(response => {
      return response.json();
    })
    .then(json => {
      handleData(json);
    });
}

//update data to see
function handleData(json) {
  //updatePage({name: 'First Name'});
  json.appdata.forEach(entry => {
    const newEntry = {
      name: entry.firstName
    };
    //updatePage(meme);
  });
}

window.onload = function() {
  const button = document.querySelector('input[type="submit"]');
  button.onclick = submit;
  requestData();
};
