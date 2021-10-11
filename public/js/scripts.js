const myCalendar = new TavoCalendar('#my-calendar',
    {date: "2021-10-1"})

const loadEvents = function(){
    
    fetch( '/loadEvents', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(function(response){
        return response.json()
    })
      .then(function(json){
        
        let table = document.getElementById("eventsTable")
        let rowCount = table.rows.length;

        for (let count = 1; count < rowCount; count++) {
            table.deleteRow(1);
        }

        for(let count = 0; count < json.length; count++){
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let item = document.createTextNode(json[count].eventName);
            let item2 = document.createTextNode("No date chosen");
            let item3 = document.createTextNode("No time chosen");
            let item4 = document.createTextNode(json[count].location);
            if (json[count].chosenEventDate !== null){
                item2 = document.createTextNode(json[count].chosenEventDate);
                item3 = document.createTextNode(json[count].chosenStartTime);
            }

            td1.appendChild(item);
            td2.appendChild(item2);
            td3.appendChild(item3);
            td4.appendChild(item4);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.append(tr);
        }
      })
}

window.onload = function(){
    loadEvents()
}
