/* const myCalendar = new TavoCalendar('#my-calendar',
    {date: "2021-10-1"}) */

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
            let tr = document.createElement("tr")
            let td = document.createElement("td")
            let item = document.createTextNode(json[count].eventName)
            td.appendChild(item)
            tr.appendChild(td)

            table.append(tr)
        }
      })
}

window.onload = function(){
    loadEvents()
    
}