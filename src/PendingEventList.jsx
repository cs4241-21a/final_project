import React from "react";
import AvailabilitySchedule from "./AvailabilitySchedule";

class PendingEventList extends React.Component {
    
    async load() {
        await fetch('/pendingEvents', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => response.json())
        .then(response => {
            for (let event of response.events.values()) {
                event.availability = []
            }
            this.setState({
                events: response.events,
                username: response.username,
            })
        })
    }
    
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            username: "",
        }
        this.load()

        this.addUserAvail = this.addUserAvail.bind(this)
        this.updateEvent = this.updateEvent.bind(this)
    }

    updateEvent(eventID, selection) {
        let newEvents = this.state.events;
        let event = null

        for(let currEvent of newEvents) {
            // Add correct availability to the given event
            if(currEvent._id === eventID) {
                event = currEvent
                break
            }
        }

        if(event == null) {
            throw new Error(eventID + " not found in events state")
        }
        else {
            event.availability = selection
            this.setState({
                events: newEvents,
                username: this.state.username,
            })
        }
    }

    addUserAvail(event) {
        const json = {
            eventID: event._id,
            attendeesAvailArray: event.availability
        },
        body = JSON.stringify(json);
    
        // submit new value
        fetch('/addUserAvail', {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            window.location.reload();
        })
    }

    render() {
        return (
        <>
            {this.state.events.map(event =>
            <>
                <div>
                    <h3>{event.eventName}</h3>
                    <br/>
                    <p>Description: {event.description}</p>
                    <br/>
                    <p>Location: {event.location}</p>
                    <br/>
                    <p>Attendees:</p>
                    <ul>
                        {event.attendees.map(attendee => 
                            <li>{attendee}</li>
                        )}
                    </ul>
                    <br/>
                    
                    {event.chosenEventDate === null || event.chosenEventTime === null ?
                        <p>Event date/time has not been chosen yet</p> : (
                        <>
                            <p>Event Date:</p>
                            <p>{event.chosenEventDate}</p>
                            <br/>
                            <p>Event Time:</p>
                            <p>{event.chosenStartTime}</p>
                        </>
                    )}
                    <br/>

                    <p>Open Days and Time Slots: Click and submit to update availability</p>
                    <div class="containerRow">
                        <AvailabilitySchedule event={event} username={this.state.username} updateEvent={this.updateEvent}/>
                        <button type="button" style={{maxHeight: "45px"}} onClick={clickEvent => this.addUserAvail(event)}>Accept Invite</button>
                    </div>
                    
                </div>
                <br/>
                <br/>
            </>
            )}
        </>
        );
    }
}

export default PendingEventList;
