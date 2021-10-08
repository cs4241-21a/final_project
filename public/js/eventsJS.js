const createEventForm = document.getElementById("createEventForm")
const eventName = document.getElementById('title');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
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
    let attendeesList = document.getElementById('attendees' + eventID).value.split(",");
    const json = {
        eventID: eventID,
        chosenEventDate: document.getElementById('finalDate' + eventID).value,
        chosenStartTime: document.getElementById('finalTime' + eventID).value,
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
    });

    window.location.reload();
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
    let attendeesList = attendees.value.split(",");
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
