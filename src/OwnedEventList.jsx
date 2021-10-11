import React from "react";
import ConflictSchedule from "./ConflictSchedule";

class OwnedEventList extends React.Component {

    async load() {
        const response = await fetch('/ownedEvents', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        const jsonResponse = await response.json()

        const updatedEvents = jsonResponse.events
        const eventInput = {}

        // Add pending attendees list
        for(const event of jsonResponse.events) {
            let pendingAttendees = []
            for(const attendee of event.attendees) {
                let notAccepted = true
                
                for(const acceptedAttendee of event.attendeesAvailability) {
                    if(acceptedAttendee.name === attendee) {
                        notAccepted = false
                        break
                    }
                }

                if(notAccepted) {
                    pendingAttendees.push(attendee)
                }
            }
            event.pendingAttendees = pendingAttendees
            eventInput[event._id] = {
                eventName: event.eventName,
                description: event.description,
                attendees: event.attendees.join(","),
                location: event.location,
                chosenEventDate: event.chosenEventDate,
                chosenStartTime: event.chosenStartTime,
            }
        }

        this.setState({
            events: updatedEvents,
            username: jsonResponse.username,
            eventInputs: eventInput
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            events: [],
            username: "",
            eventInputs: {},
        }
        this.load()

        this.editEvent = this.editEvent.bind(this)
        this.onChange = this.onChange.bind(this)
        this.selectDate = this.selectDate.bind(this)
    }

    onChange(target, eventID) {
        const eventInputs = this.state.eventInputs
        eventInputs[eventID][target.name] = target.value
        this.setState({
            eventsInputs: eventInputs,
            username: this.state.username,
            events: this.state.events,
        })
    }

    selectDate(eventID, chosenEventDate, chosenStartTime) {
        let eventInputs = this.state.eventInputs
        let chosenDate = new Date(chosenEventDate)
        let chosenTime = Number(chosenStartTime)

        chosenDate.setHours(Math.floor(chosenTime))
        chosenDate.setMinutes((chosenTime * 10) % 10 == 5 ? 30 : 0)

        eventInputs[eventID]["chosenEventDate"] = chosenDate
        eventInputs[eventID]["chosenStartTime"] = chosenTime
    }

    async editEvent(eventID){
        let makePersonalEvent = false;
        let attendeesList = this.state.eventInputs[eventID]["attendees"].replace(/\s/g,'').split(",");
        let eventDate = this.state.eventInputs[eventID]["chosenEventDate"];
        let getStartTime = this.state.eventInputs[eventID]["chosenStartTime"];
        let startTime = -1
    
        if (eventDate === null){
            eventDate = null;
            startTime = null;
        } else {
            if(getStartTime % 1 == .5 ) {
                let waitDate = new Date(eventDate);
                waitDate.setHours((getStartTime - .5), 30)
                eventDate = waitDate
            } else {
                let wait2Date = new Date(eventDate)
                wait2Date.setHours(getStartTime)
                eventDate = wait2Date
            }
            makePersonalEvent = true
            startTime = this.state.eventInputs[eventID]["chosenStartTime"];
        }

        if (makePersonalEvent) {
            let endEventDate = eventDate;
            let eventDur = 1;
            //supposed to be + event duration but no quick way to access that here
            /*if((getStartTime) % 1 == .5 ) {
                endEventDate = endEventDate.setHours((startTime + eventDur), 30)
            } else {
                endEventDate = endEventDate.setHours((startTime + eventDur))
            }*/
            for (let i = 0; i < attendeesList.length; i++) {
                const json2 = {
                        eventName: this.state.eventInputs[eventID]["eventName"],
                        attendeeName: attendeesList[i],
                        startDateTime: eventDate,
                        endDateTime: eventDate,
                        description: this.state.eventInputs[eventID]["description"],
                        location: this.state.eventInputs[eventID]["location"],
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
            chosenEventDate: eventDate,
            chosenStartTime: startTime,
            description: this.state.eventInputs[eventID]["description"],
            location: this.state.eventInputs[eventID]["location"],
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

    async deleteEvent(eventID){

        const json = {
            eventID: eventID
        },
        body = JSON.stringify(json);
    
        // submit new value
        await fetch('/deleteEvent', {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        window.location.reload();
    }

    render() {
        return (
        <>
            {this.state.events.map(event =>
            <>
                <form id={event._id}>
                    <h3>{event.eventName}</h3>
                    <br/>
                    <label for={"description" + event._id}>Description:</label>
                    <textarea id={"description" + event._id} form={event._id} name="description" onChange={e => this.onChange(e.target, event._id)}>
                        {event.description}
                    </textarea>
                    <br/>
                    <label for={"location" + event._id}>
                        Location:
                    </label>
                    <input id={"location" + event._id} form={event._id} name="location" onChange={e => this.onChange(e.target, event._id)}/>
                    <br/>
                    <label for={"attendees" + event._id}>
                        Attendees:
                    </label>
                    <textarea id={"attendees" + event._id} form={event._id} name="attendees" onChange={e => this.onChange(e.target, event._id)}>
                        {event.attendees.join(", ")}
                    </textarea>
                    <br/>

                    <div>
                        <p>Accepted Invites:</p>
                        <ul>
                            {event.attendeesAvailability.map(availability =>
                                <li>{availability.name}</li> 
                            )}
                        </ul>
                        <p>Pending Invites:</p>
                        <ul>
                            {event.pendingAttendees.length <= 0 ?
                                <li>No pending Invitations</li> :
                                <>
                                    {event.pendingAttendees.map(attendee => 
                                        <li>{attendee}</li>
                                    )}
                                </>
                            }
                        </ul>
                    </div>

                    <ConflictSchedule event={event} owner={this.state.username} selectDate={this.selectDate}/>

                    <br/>
                    <br/>
                    <button type="button" onClick={e => this.editEvent(event._id)}>Edit Event</button>
                    <br/>
                    <button type="button" onClick={e => this.deleteEvent(event._id)}>Delete Event</button>
                    <hr/>
                </form>
            </>
            )}
        </>
        )
    }
}

export default OwnedEventList;