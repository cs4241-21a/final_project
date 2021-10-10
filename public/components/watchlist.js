
function delWatch(id) {
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
                tableData += `<td><a href="javascript:void(0);" onclick="delWatch('${data[i]._id}');">Remove</a></td>`;
                tableData += "</tr>";
            }
            document.getElementById("fanData").innerHTML = tableData;
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
    
    
        const json = {  title: desc.value,
                        score: score.value,
                        date: date.value,
                        category,
                        review: review.value
                    };
    
    

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

    return false;
};


window.onload = function () {
    fetchData();

    const button = document.querySelector("button");
    button.onclick = submit;
};
