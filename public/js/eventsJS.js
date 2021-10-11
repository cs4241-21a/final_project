const createEventForm = document.getElementById("createEventForm")
const eventName = document.getElementById('title');
const description = document.getElementById('description');
const eventLocation = document.getElementById('location');
const attendees = document.getElementById('attendees');
const amPM1 = document.getElementById('amPM1');
const amPM2 = document.getElementById('amPM2');
const startTimeHr = document.getElementById('timeStart');
const startTimeMin = document.getElementById('timeStartMin');
const endTimeHr = document.getElementById('timeEnd');
const endTimeMin = document.getElementById('timeEndMin');
const duration = document.getElementById('duration');

const alertContainer = document.getElementById('alertContainer');

const eventCalendar = new TavoCalendar(
    '#eventCalendar', {
    range_select: true,
    past_select: true,
})

function clearAlert() {
    alertContainer.replaceChildren("")
}

// Refer to https://getbootstrap.com/docs/5.1/components/alerts/
// for a list of alert types
function alert(message, type) {
    const alertWrapper = document.createElement("div")
    alertWrapper.classList = "m-3 alert alert-" + type;
    alertWrapper.textContent = message
    
    alertContainer.appendChild(alertWrapper)
  }

async function editEvent(eventID){
    let makePersonalEvent = false;
    let attendeesList = document.getElementById('attendees' + eventID).value.split(",");
    let evntDate = document.getElementById('finalDate' + eventID).value;
    let startTime = -1
    let getStartTime = document.getElementById('finalTime' + eventID + evntDate).value;

    if (evntDate === "null"){
        evntDate = null;
        startTime = null;
    } else {
        if(getStartTime % 1 == .5 ) {
            let waitDate = new Date(evntDate);
            waitDate.setHours((getStartTime - .5), 30)
            evntDate = waitDate
        } else {
            let wait2Date = new Date(evntDate)
            wait2Date.setHours(getStartTime)
            evntDate = wait2Date
        }
        makePersonalEvent = true;
        startTime = getStartTime;
    }

    if (makePersonalEvent) {
        let endEventDate = evntDate;
        let eventDur = 1;
        //supposed to be + event duration but no quick way to access that here
        /*if((getStartTime) % 1 == .5 ) {
            endEventDate = endEventDate.setHours((startTime + eventDur), 30)
        } else {
            endEventDate = endEventDate.setHours((startTime + eventDur))
        }*/
        for (let i = 0; i < attendeesList.length; i++) {
            const json2 = {
                    eventName: document.getElementById('eventName' + eventID).innerText,
                    attendeeName: attendeesList[i],
                    startDateTime: evntDate,
                    endDateTime: evntDate,
                    description: document.getElementById('description' + eventID).value,
                    location: document.getElementById('location' + eventID).value,
                },
                body2 = JSON.stringify(json2);

            // submit new value
            await fetch('/addToOthersPersonal', {
                method: 'POST',
                body: body2,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) {
                    // do something with the response
                    console.log("Post made to server");
                })
        }
    }
    const json = {
        eventID: eventID,
        chosenEventDate: evntDate,
        chosenStartTime: startTime,
        description: document.getElementById('description' + eventID).value,
        location: document.getElementById('location' + eventID).value,
        attendees: attendeesList,
    },
    body = JSON.stringify(json);
    
    // submit new value
    await fetch('/editEvent', {
        method: 'POST',
        body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // do something with the response
            console.log("Post made to server");

        })
        .then(function (json) {
            console.log(json);
            window.location.reload();
        })

    //window.location.reload();


}


let oldElementVal = "";
function showDiv(element, eventID) {
    console.log(eventID);
    if (element.value !== oldElementVal && element.value !== "null") {
        document.getElementById('hiddenTime' + eventID + element.value).style.display = 'block';
        if (oldElementVal !== "") {
            document.getElementById('hiddenTime' + oldElementVal).style.display = 'none';
            // currently this sets any other selectors to none event if they are in a differnt event
            // could change if we want just need a new variable and a few if statements maybe but
            // just gonna leave it for right now
        }
        oldElementVal = eventID + element.value;
    } else if (oldElementVal !== "" && element.value === "null"){
        document.getElementById('hiddenTime'+ oldElementVal).style.display = 'none';
    }
}


function getTimeRange(){
    let timeRange = [];
    let startTime = parseFloat(startTimeHr.value);
    let endTime = parseFloat(endTimeHr.value);
    let meetingDur = parseFloat(duration.value);
    if(amPM1.value === "PM"){
        startTime += 12;
    }
    if(parseInt(startTimeMin.value) === 30){
        startTime += .5;
    }
    if(amPM2.value === "PM"){
        endTime += 12;
    }
    if(parseInt(endTimeMin.value) === 30){
        endTime += .5;
    }
    
    if ((startTime + meetingDur) >= endTime){
        return undefined;
    }
    
    while (startTime <= (endTime - meetingDur)){
        timeRange.push(startTime);
        startTime += .5;
    }
    
    return timeRange;
}

async function submitHandler() {
    let attendeesList = []
    if(attendees !== ""){attendeesList = attendees.value.split(", ")}
    let timeRange = getTimeRange();
    
    let startDate = eventCalendar.getStartDate();
    let endDate = eventCalendar.getEndDate();

    // Given an error if dates were not selected
    clearAlert();
    if (startDate == null || endDate == null) {
        alert("A date range was not selected", "danger");
        return;
    }

    const json = {
        title: eventName.value,
        startDate: eventCalendar.getStartDate(),
        endDate: eventCalendar.getEndDate(),
        description: description.value,
        location: eventLocation.value,
        attendees: attendeesList,
        timeRange: timeRange,
        duration: duration.value
    },
    body = JSON.stringify(json);
    
    // submit new value
    await fetch('/createEvent', {
        method: 'POST',
        body,
        headers: {
            "Content-Type": "application/json"
        }
    });

    createEventForm.reset();
    eventCalendar.clear();
    window.location.reload();
}

function openEventMaker(){
    document.getElementById('eventMaker').style.display = "block";
    document.getElementById('eventMakerBtn').style.display = "none";
}

async function addUserAvail(eventID, dateList){
    let newAvailTimes = [];
    let newDateList = dateList.split(",");

    for (let i = 0; i < newDateList.length; i++) {
        let times = []
        for (let j = 0; j < 48; j++) {
            if (document.getElementById('limitingTimes' + eventID + i + j) !== null) {
                if (document.getElementById('limitingTimes' + eventID + i + j).checked) {
                    times.push(document.getElementById('limitingTimes' + eventID + i + j).value)
                }
            } else {
                j = 48;
            }
        }
        newAvailTimes.push(times);
    }

    const json = {
            eventID: eventID,
            attendeesAvailArray: newAvailTimes
        },
        body = JSON.stringify(json);

    // submit new value
    await fetch('/addUserAvail', {
        method: 'POST',
        body,
        headers: {
            "Content-Type": "application/json"
        }
    });

    window.location.reload();
}
