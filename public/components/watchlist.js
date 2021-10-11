
var addForm = document.getElementById("addForm");
addForm.style.display = "none";
var editForm = document.getElementById("editForm");
editForm.style.display = "none";
var closeAdd = document.getElementById('closeAdd');
var closeEdit = document.getElementById('closeEdit');

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
    editForm.style.display = "block";

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
          document.getElementById("title2").value = data.result.title;
          document.getElementById("cat2").value = data.result.category;
          document.getElementById("score2").value = data.result.score;
          document.getElementById("date2").value = data.result.date;
          document.getElementById("idToModify2").value = id;
          document.getElementById("review2").value = data.result.review;

          document.getElementById("title").focus();
      });
}

function submitModify(e) {
    
    e.preventDefault();
    const id = document.querySelector("#idToModify2").value;
    const desc = document.querySelector("#title2"),
    score = document.querySelector("#score2"),
    date = document.querySelector("#date2"),
    category = document.getElementById("cat2").value;
    review = document.querySelector("#review2");


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
        editForm.style.display = "none";
        fetchData();
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
            addForm.style.display = "none";
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
    document.getElementById("submitEdit").onclick = submitModify;

    const openAdd_btn = document.getElementById("openAdd");
    openAdd_btn.onclick = openAdd;

    closeAdd.onclick = function() {
        addForm.style.display = "none";
    }

    closeEdit.onclick = function(){
        editForm.style.display = "none";
    }
};
