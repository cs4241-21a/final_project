export function addCalendar(calID, calName, calColor) {
    let cal = {
        parent = getCalendarByID(calID),
        children = [],
        name = calName,
        color = calColor
    }

    fetch('/addCalendar', {
        method: 'post',
        body: JSON.stringify(cal)
    }).then(function(response){
        return response.text(); // returns either the objectID on success, or an error message on failure
    }).then(function(response){
        console.log(response.text());
    })
}

export function removeCalendar(calID) {
    fetch('/removeCalendar', {
        method: 'post',
        body: calID
    }).then(function(response){
        return response.text(); // Returns either a success or failure message, depending on outcome
    }).then(function(response){
        console.log(response.text());
    })
}

// TODO: Prototype function, do not use yet
export function getCalendarByID(calID) {
    if (calID === NULL) {
        return calID;
    }

    fetch('/getCalendar', {
        method: 'post',
        body: calID
    }).then(function(response){
        return response.text(); // Return the calendar ID if exists, return error if else
    }).then(function(response){
        console.log(response.text());
    })
}

export function modifyCalendar(calID, calName, calColor){
    let cal = {
        parent: getCalendarByID(calID),
        children: [],
        name: calName,
        color: calColor
    }

    fetch('/modifyCalendar', {
        method: 'post',
        body: JSON.stringify(cal)
    }).then(function(response){
        return response.text(); // returns either the objectID of the modified calendar on success, or an error message on failure
    }).then(function(response){
        console.log(response.text());
    })
}

export function createEvent(uID, eDate, eName, eStartTime, eEndTime, eAllDay) {
    let event = {
        userID: uID,
        date: eDate,
        name: eName,
        //repeat = eRepeat, // depending on if repeat is "WEEKLY", "DAILY", "MONTHLY", or NULL, create additional tasks and push those
        startTime: eStartTime, // will be set to 12:00am on the specified date if allDay is true
        endTime: eEndTime, // will be set to NULL if allDay is true
        allDay: eAllDay
    }

    fetch('/addEvent',{
        method: 'post',
        body: JSON.stringify(event)
    }).then(function(response){
        return response.text() // return the object ID of the event, error message on failure
    }).then(function(response){
        console.log(response.text())
    })

    // Mongo push to events collection
}

export function removeEvent(uID, eID) {
    let info = {
        userID: uID,
        eventID: eID
    }

    fetch('/deleteEvent', {
        method: 'post',
        body: JSON.stringify(info)
    }).then(function(response){
        return response.text() // return a success message upon deletion, or error message if failure
    }).then(function(response){
        console.log(reponse.text())
    })
}

export function modifyEvent(uID, eDate, eName, eStartTime, eEndTime, eAllDay) {
    let event = {
        userID: uID,
        date: eDate,
        name: eName,
        //repeat = eRepeat, // depending on if repeat is "WEEKLY", "DAILY", "MONTHLY", or NULL, create additional tasks and push those
        startTime: eStartTime, // will be set to 12:00am on the specified date if allDay is true
        endTime: eEndTime, // will be set to NULL if allDay is true
        allDay: eAllDay
    }

    fetch('/modifyEvent',{
        method: 'post',
        body: JSON.stringify(event)
    }).then(function(response){
        return response.text() // return the object ID of the modified event, error message on failure
    }).then(function(response){
        console.log(response.text())
    })

    // Mongo push to events collection
}