function addCalendar(calID, calName, calColor) {
    let cal = {
        parent = getCalendarByID(calID),
        children = [],
        name = calName,
        color = calColor
    }

    // Mongo push cal to the calendar collection
}

function removeCalendar(calID) {
    // Do the same thing as get calendar by ID, but perform a app.remove DeleteOne instead
}

function getCalendarByID(calID) {
    if (calID === NULL) {
        return calID;
    }
    // perform Mongo/Express app.get to check if calendar exists

    // If the calendar specified by the id exists, 
    // return calID
    // else
    // return NULL
}

function createEvent(uID, eDate, eName, eStartTime, eEndTime, eAllDay) {
    let event = {
        userID = uID,
        date = eDate,
        name = eName,
        //repeat = eRepeat, // depending on if repeat is "WEEKLY", "DAILY", "MONTHLY", or NULL, create additional tasks and push those
        startTime = eStartTime, // will be set to 12:00am on the specified date if allDay is true
        endTime = eEndTime, // will be set to NULL if allDay is true
        allDay = eAllDay
    }

    // Mongo push to events collection
}

function removeEvent(uID, eID) {
    // Perform Mongo app.remove DeleteOne for the specified event with the given userID and eventID
}

function createTask(uID, tDueDate, tName, tDueTime) {
    let task = {
        userID = uID,
        date = tDueDate,
        name = tName,
        startTime = NULL,
        endTime = tDueTime,
        allDay = false
    }

    // Mongo push to tasks collection
}

function removeTask(uID, tID) {
    // Perform Mongo app.remove DeleteOne for the specified task with the given userID and taskID
}