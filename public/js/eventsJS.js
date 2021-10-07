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
        startTime += meetingDur;
    }

    return timeRange;
}

async function submitHandler() {

    let attendeesList = attendees.value.split(",");
    let timeRange = getTimeRange();




    const json = {
            title: eventName.value,
            startDate: startDate.value,
            endDate: endDate.value,
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
    })
        .then(response => {
            //return response.json();
        })
        .then(json => {

        })
}
