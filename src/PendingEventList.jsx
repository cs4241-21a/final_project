import React from "react";
import AvailabilitySchedule from "./AvailabilitySchedule";

class PendingEventList extends React.Component {
    
    load() {
        fetch('/pendingsEvents')
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

    convertSelectionToAvailability(selection) {
        console.log(selection)
    }

    updateEvent(eventID, selection) {
        let newEvents = this.state.events;
        for(let event of newEvents) {
            // Add correct availability to the given event
            if(event._id === eventID) {
                event.availability = selection
                this.setState({
                    events: newEvents,
                    username: this.state.username,
                })
                return
            }
        }

        throw new Error(eventID + " not found in events state")
    }

    addUserAvail(event) {
        async function buttonClickEvent() {
            const json = {
                eventID: event._id,
                attendeesAvailArray: event.availability
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
        return buttonClickEvent;
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
                        <AvailabilitySchedule event={event} username={this.state.username} updateEvent={this.updateEvent}/>
                        <br/>
                        <br/>
                        <button type="button" onclick={this.addUserAvail(event)}>Accept Invite</button>
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
