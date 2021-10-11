import React from "react";
import ScheduleSelector from './react-schedule-selector/src/lib'

class AvailabilitySchedule extends React.Component {
    async loadPersonalCalendar(eventID) {
        const response = await fetch('/getavailabilityfrompersonal', {
            method: "POST",
            body: JSON.stringify({
                eventID: eventID
            }),
            headers: {
                'Cache-Control': 'no-cache',
                "Content-Type": "application/json",
            },
        })
        const currSchedule = await response.json()
        return currSchedule
    }
    
    constructor(props) {
        super(props)
        let event = this.props.event

        let startDate = new Date(event.availableDates[0])
        let numDays = event.availableDates.length
        let hourlyChunks = 1 / event.meetingDuration
        let minTime = event.availableTimes[0][0]
        let maxTime = event.availableTimes[0][event.availableTimes[0].length - 1] + event.meetingDuration

        // Find current schedule or use personal calednar
        let availNotFound = true
        for(const availabilityBlob of event.attendeesAvailability) {
            if(availabilityBlob.name === this.props.username) {
                availNotFound = !availabilityBlob.personalLoaded
                // Personal calendar has already been loaded, so use what currently exists
                this.state = {
                    schedule: availabilityBlob.availability,
                    startDate,
                    numDays,
                    hourlyChunks,
                    minTime,
                    maxTime,
                }
                break
            }
        }

        if(availNotFound) {
            // Load in personal calendar if it has not already
            // Set availability to something blank for now
            this.state = {
                schedule: [],
                startDate,
                numDays,
                hourlyChunks,
                minTime,
                maxTime,
            }
            fetch('/getavailabilityfrompersonal', {
                method: "POST",
                body: JSON.stringify({
                    eventID: event._id
                }),
                headers: {
                    'Cache-Control': 'no-cache',
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(availability => {
                this.setState({
                    schedule: availability,
                    startDate,
                    numDays,
                    hourlyChunks,
                    minTime,
                    maxTime,
                })
            })
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(newSchedule) {
        this.props.updateEvent(this.props.event._id, newSchedule)
        this.setState({
            schedule: newSchedule
        })
    }

    render() {
        return (
            <ScheduleSelector selection={this.state.schedule}
                              onChange={this.handleChange}
                              startDate={this.state.startDate}
                              numDays={this.state.numDays}
                              hourlyChunks={this.state.hourlyChunks}
                              minTime={this.state.minTime}
                              maxTime={this.state.maxTime}
                              timeFormat='h:mm A'
                              selectionScheme='square'
                              rowGap="1%"
                              columnGap="1%"/>
        )
    }
}

export default AvailabilitySchedule;
