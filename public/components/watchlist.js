
var addForm = document.getElementById("addForm");
addForm.style.display = "none";

// delete the chosen watch
function delWatch(id) {
    if(confirm("Are you sure you want to delete this watchlist?")){
        const json = {id: id};

        fetch("/del", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        }).then(function (_) {
            fetchData();
        });
    }
    else{
        alert("Delete quashed!")
    }
}

// fetch the data
function fetchData() {
    fetch('/getCategory/adventure')
        .then(response => response.json())
        .then(data => {
            if (data.code === 403)
                window.location.href = '/login.html';

            let tableData = "";
            for (let i = 0; i < data.length; i++) {
                tableData += "<tr>";
                tableData += `<td>${data[i].title}</td>`;
                tableData += `<td>${data[i].score}</td>`;
                tableData += `<td>${data[i].date}</td>`;
                tableData += `<td>${data[i].review}</td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="loadModify('${data[i]._id}');">Edit</a></td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="delWatch('${data[i]._id}');">Remove</a></td>`;
                tableData += "</tr>";
            }
            document.getElementById("advData").innerHTML = tableData;
        });

        fetch('/getCategory/love')
        .then(response => response.json())
        .then(data => {
            if (data.code === 403)
                window.location.href = '/login.html';

            let tableData = "";
            for (let i = 0; i < data.length; i++) {
                tableData += "<tr>";
                tableData += `<td>${data[i].title}</td>`;
                tableData += `<td>${data[i].score}</td>`;
                tableData += `<td>${data[i].date}</td>`;
                tableData += `<td>${data[i].review}</td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="loadModify('${data[i]._id}');">Edit</a></td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="delWatch('${data[i]._id}');">Remove</a></td>`;
                tableData += "</tr>";
            }
            document.getElementById("loveData").innerHTML = tableData;
        });

        fetch('/getCategory/suspense')
        .then(response => response.json())
        .then(data => {
            if (data.code === 403)
                window.location.href = '/login.html';

            let tableData = "";
            for (let i = 0; i < data.length; i++) {
                tableData += "<tr>";
                tableData += `<td>${data[i].title}</td>`;
                tableData += `<td>${data[i].score}</td>`;
                tableData += `<td>${data[i].date}</td>`;
                tableData += `<td>${data[i].review}</td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="loadModify('${data[i]._id}');">Edit</a></td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="delWatch('${data[i]._id}');">Remove</a></td>`;
                tableData += "</tr>";
            }
            document.getElementById("susData").innerHTML = tableData;
        });

        fetch('/getCategory/sol')
        .then(response => response.json())
        .then(data => {
            if (data.code === 403)
                window.location.href = '/login.html';

            let tableData = "";
            for (let i = 0; i < data.length; i++) {
                tableData += "<tr>";
                tableData += `<td>${data[i].title}</td>`;
                tableData += `<td>${data[i].score}</td>`;
                tableData += `<td>${data[i].date}</td>`;
                tableData += `<td>${data[i].review}</td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="loadModify('${data[i]._id}');">Edit</a></td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="delWatch('${data[i]._id}');">Remove</a></td>`;
                tableData += "</tr>";
            }
            document.getElementById("solData").innerHTML = tableData;
        });

        fetch('/getCategory/fantasy')
        .then(response => response.json())
        .then(data => {
            if (data.code === 403)
                window.location.href = '/login.html';

            let tableData = "";
            for (let i = 0; i < data.length; i++) {
                tableData += "<tr>";
                tableData += `<td>${data[i].title}</td>`;
                tableData += `<td>${data[i].score}</td>`;
                tableData += `<td>${data[i].date}</td>`;
                tableData += `<td>${data[i].review}</td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="loadModify('${data[i]._id}');">Edit</a></td>`;
                tableData += `<td><a href="javascript:void(0);" onclick="delWatch('${data[i]._id}');">Remove</a></td>`;
                tableData += "</tr>";
            }
            document.getElementById("fanData").innerHTML = tableData;
        });
}

// edit the chosen watch
function loadModify(id) {
    addForm.style.display = "block";

    const json = {id: id};

    fetch("/queryWatch", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json),
    }).then(response => response.json())
      .then(data => {
          document.getElementById("boxTitle").innerText = "Edit Watch";
          document.getElementById("title").value = data.result.title;
          document.getElementById("cat").value = data.result.category;
          document.getElementById("score").value = data.result.score;
          document.getElementById("date").value = data.result.date;
          document.getElementById("idToModify").value = id;
          document.getElementById("submitButton").onclick = submitModify;

          document.getElementById("title").focus();
      });
}

function submitModify(e) {
    
    e.preventDefault();
    const id = document.querySelector("#idToModify").value;
    const desc = document.querySelector("#title"),
    score = document.querySelector("#score"),
    date = document.querySelector("#date"),
    category = document.getElementById("cat").value;
    review = document.querySelector("#review");


    const json = {  id,
                    title: desc.value,
                    score: score.value,
                    date: date.value,
                    category,
                    review: review.value
                };
    fetch("/editWatch", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json),
    }).then(function (_) {
        window.location.reload();
    });
}

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    const desc = document.querySelector("#title"),
            score = document.querySelector("#score"),
            date = document.querySelector("#date"),
            category = document.getElementById("cat").value;
            review = document.querySelector("#review");
    
    if(desc.value === ""){
        alert("Title cannot be null!")
    }
    else if(score.value === ""){
        alert("Score cannot be null!")
    }
    else{
        const json = {  title: desc.value,
            score: score.value,
            date: date.value,
            category,
            review: review.value
        };

        addForm.style.display = "none";

        fetch("/add", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        }).then(function (_) {
            fetchData();
        });
    }
};

const openAdd = function(e){
    e.preventDefault()

    if(addForm.style.display==="none"){
        addForm.style.display = "block";
    }
    else {
        addForm.style.display = "none";
    }
}

window.onload = function () {
    fetchData();

    document.getElementById("submitButton").onclick = submit;

    const openAdd_btn = document.getElementById("openAdd");
    openAdd_btn.onclick = openAdd;

    window.onclick = function(e){
        if(e.target == addForm){
            addForm.style.display = "none";
        }
      }

};
