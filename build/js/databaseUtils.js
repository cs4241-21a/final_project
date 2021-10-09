// All CRUD operations expect a JSON object or an ObjectId

// import { CallMissed } from "@material-ui/icons";

const databaseUtils = {
    getAllCalendars: async function() {
        // Returns the calendars or an error
        let calendars;
        await fetch('/getAllCalendars')
        .then(response => response.text())
        .then(text => calendars = text)
        return calendars;
    },

    addCalendar: async function(calendar) {
        let calId;
        await fetch('/addCalendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(calendar)
        }).then(response => response.text())
        .then(text => calId = text);
        return calId;
    },
    
    deleteCalendar: async function(calID) {
        // Returns either a success or failure message
        let resp;
        await fetch('/removeCalendar', {method: 'POST', body: calID })
        .then(response => response.text())
        .then(response => resp = response);
        return response;
    },
    
    modifyCalendar: async function(calendar){
        // Returns completed or failure message
        let resp;
        await fetch('/modifyCalendar', { method: 'POST', body: JSON.stringify(calendar)})
        .then(response => response.text())
        .then(text => resp = text);
        return resp;
    },

    getAllEvents: async function() {
        // Returns the calendars or an error
        let events;
        await fetch('/getAllEvents')
        .then(response => response.text())
        .then(text => events = text)
        return events;
    },
    
    addEvent: async function(event) {
        // return the object ID of the event, error message on failure
        let eventId;
        await fetch('/addEvent',{ method: 'POST', body: JSON.stringify(event) })
        .then(response => response.text())
        .then(text => eventId = text);
        return eventId;
    },
    
    deleteEvent: async function(eventID) {
        // return a success message upon deletion, or error message if failure
        let resp;
        await fetch('/deleteEvent', { method: 'POST', body: JSON.stringify(eventID) })
        .then(response => response.text())
        .then(text => resp = text);
        return resp;
    },
    
    modifyEvent: async function(event) {
        // return the object ID of the modified event, error message on failure
        let resp;
        fetch('/modifyEvent',{ method: 'POST', body: JSON.stringify(event) })
        .then(response => response.text())
        .then(text => resp = text);
        return resp;
    },

    getAllTasks: async function() {
        // Returns the calendars or an error
        let tasks;
        await fetch('/getAllTasks')
        .then(response => response.text())
        .then(text => tasks = text)
        return tasks;
    },
    
    addTask: async function(task) {
        // return the object ID of the task, error message on failure
        let taskId;
        await fetch('/addTask',{ method: 'POST', body: JSON.stringify(task) })
        .then(response => response.text())
        .then(text => taskId = text);
        return taskId;
    },
    
    deleteTask: async function(taskID) {
        // return a success message upon deletion, or error message if failure
        let resp;
        await fetch('/deleteTask', { method: 'POST', body: JSON.stringify(taskID) })
        .then(response => response.text())
        .then(text => resp = text);
        return resp;
    },
    
    modifyTask: async function(task) {
        // return the object ID of the modified task, error message on failure
        let resp;
        fetch('/modifyTask',{ method: 'POST', body: JSON.stringify(task) })
        .then(response => response.text())
        .then(text => resp = text);
        return resp;
    },
    
    getUserID: async function() {
        let userId;
        await fetch('/getUserID')
        .then(response => response.text())
        .then(text => userId = text);
        return userId;
    }
}

export default databaseUtils;