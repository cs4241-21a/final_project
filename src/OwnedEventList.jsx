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
        let attendeesList = this.state.eventInputs[eventID]["attendees"].replace(/\s/g,'').split(",");
        let eventDate = this.state.eventInputs[eventID]["chosenEventDate"];
        let startTime = -1
    
        if (eventDate === "null"){
            eventDate = null;
            startTime = null;
        } else {
            startTime = this.state.eventInputs[eventID]["chosenStartTime"];
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

    async function deleteEvent(eventID){

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
                    <button type="button" onClick={e => this.editEvent(event._id.toString())}>Edit Event</button>
                    <br/>
                    <button type="button" onclick={e => this.deleteEvent(event._id)}>Delete Event</button>
                    <hr/>
                </form>
            </>
            )}
        </>
        )
    }
}

export default OwnedEventList;