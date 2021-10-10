
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
    fetch('/getAdventure')
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
                tableData += "</tr>";
            }
            document.getElementById("advData").innerHTML = tableData;
        });

        fetch('/getLove')
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
                tableData += "</tr>";
            }
            document.getElementById("loveData").innerHTML = tableData;
        });

        fetch('/getSuspense')
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
                tableData += "</tr>";
            }
            document.getElementById("susData").innerHTML = tableData;
        });

        fetch('/getSol')
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
                tableData += "</tr>";
            }
            document.getElementById("solData").innerHTML = tableData;
        });

        fetch('/getFantasy')
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
        date = document.querySelector("#date");
        review = document.querySelector("#review");

    const json = {  title: desc.value, 
                    score: score.value, 
                    date: date.value,
                    review = review.value
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
