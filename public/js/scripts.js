/* const myCalendar = new TavoCalendar('#my-calendar',
    {date: "2021-10-1"}) */

//const { info } = require("npmlog");

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
            let td5 = null
            let item = document.createTextNode(json[count].eventName);
            let item2 = document.createTextNode("No date chosen");
            let item3 = document.createTextNode("No time chosen");
            let item4 = document.createTextNode(json[count].location);
            let allowButton = false
            if (json[count].chosenEventDate !== null){
                item2 = document.createTextNode(json[count].chosenEventDate.slice(0,10));
                item3 = document.createTextNode(json[count].chosenStartTime);
                allowButton = true
            }
            let item5 = null
            if(json[count].chosenEventDate === null){allowButton = false}


           if(allowButton === true){
            td5 = document.createElement("td");
            item5 = document.createElement("a")
            let button = document.createElement("button")
            button.innerHTML = "Click for ics"
            item5.appendChild(button)

            let file = createFile(json[count])
            item5.setAttribute("href", file)
            
            item5.setAttribute("download", "event.ics")
           }
            

            td1.appendChild(item);
            td2.appendChild(item2);
            td3.appendChild(item3);
            td4.appendChild(item4);
            if(allowButton === true){td5.appendChild(item5)}

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            if(allowButton === true){tr.appendChild(td5)}

            table.append(tr);
        }
      })
}

const refreshPersonalCal = function(){

    fetch('/refreshpersonal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
        var calendarEl = document.getElementById('my-calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            events: response,
            eventClick: function(info){
                info.jsEvent.preventDefault();
                //console.log(info.event)
                let del = confirm("Would you like to delete the event: " + info.event.title + "?")

                if(del){
                    console.log(info.event.id)
                    fetch('/removepersonal', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: info.event.id
                        })
                    })
                        .then(response => {
                            location.reload()
                        })
                }
            }
        });
        calendar.render();
    })

}


const createFile = function(event) {
    /*let eventDate = {
        start: event.availableDates[0],
        end: event.availableDates[event.availableDates.length - 1]
      }*/

    let eventDate = null;

    if ((event.chosenStartTime + event.meetingDuration) % 1 == .5) {
        eventDate = {
            start: convertDate(event.chosenEventDate),
            //end: convertDate(event.chosenEventDate)
            end: convertDate(event.chosenEventDate).setHours((event.chosenStartTime + event.meetingDuration - .5), 30)
            //end: new Date(dateHolder.setHours((event.chosenStartTime + event.duration - .5), 30))
            //end: event.chosenEventDate.setHours((event.chosenStartTime + event.duration - .5), 30)
        }
    } else {
        let endDate = new Date(event.chosenEventDate)
        endDate.setHours((event.chosenStartTime + event.meetingDuration)).toString()
        //endDate = endDate.toString()

        //endDate.setHours(event.chosenStartTime + event.meetingDuration)
        eventDate = {
            start: convertDate(event.chosenEventDate),
            end: convertDate(endDate)
            //end: new Date(dateHolder.setHours((event.chosenStartTime + event.duration)))

            //end: convertDate(event.chosenEventDate)
            //end: event.chosenEventDate.setHours((event.chosenStartTime + event.duration))
        }
    }
      let summary = event.eventName;
      let description = event.description;
     return makeIcsFile(eventDate, summary, description);
    //downloadButton.classList.remove("hide");
  }
  function convertDate(date) {
    console.log(date)
    let event = new Date(date).toISOString();
    event = event.split("T")[0];
    event = event.split("-");
    event = event.join("");
    return event;
  }
  function makeIcsFile(date, summary, description) {
    let icsFile = null;
    let test =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Test Cal//EN\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      "UID:test-1\n" +
      "DTSTART;VALUE=DATE:" +
      //convertDate(date.start) +
        date.start +
      "\n" +
      "DTEND;VALUE=DATE:" +
      //convertDate(date.end) +
        date.end +
      "\n" +
      "SUMMARY:" +
      summary +
      "\n" +
      "DESCRIPTION:" +
      description +
      "\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";
  
    let data = new File([test], { type: "text/plain" });
  
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }
  
    icsFile = window.URL.createObjectURL(data);
  
    return icsFile;
  }

window.onload = function(){
    loadEvents()
    refreshPersonalCal()
}
