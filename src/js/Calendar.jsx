import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};

function getFirstDayOfMonth(month, year) {
    let firstDay = new Date(year, month, 1);
    if(typeof daysInWeek[firstDay.getDay()] != 'undefined') {
        return daysInWeek[firstDay.getDay()];
    } else {
        return 'error';
    }
}

function getNumDaysInMonth(month) {
    return new Date(2020, month + 1, 0).getDate();
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            events: GLOBAL_VARIABLES.events,
        };
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.newEventSubmit = this.newEventSubmit.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        // this.modifyEvent = this.modifyEvent.bind(this);
        console.log(this.state.events);
    }

    previousMonth() {
        let newMonth = this.state.month - 1;
        let newYear = this.state.year;
        if(this.state.month === 0) {
            newMonth = 11;
            newYear--;
        }
        this.setState({
            month: newMonth,
            year: newYear,
        });
    }

    nextMonth() {
        let newMonth = this.state.month + 1;
        let newYear = this.state.year;
        if(this.state.month === 11) {
            newMonth = 0;
            newYear++;
        }
        this.setState({
            month: newMonth,
            year: newYear,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, selectedCalendarId: nextProps.selectedCalendarId});
    }

    newEventSubmit(e, day){
        e.preventDefault();
        if(this.state.selectedCalendarId === '' || !this.state.selectedCalendarId) {
            alert('Please select a calendar to add this event to!');
            return;
        }
        let date = new Date(this.state.year, this.state.month, day);

        let newEvent = {
            user: GLOBAL_VARIABLES.userId,
            date: date,
            name: this.state.name,
            calendar: this.state.selectedCalendarId
        };

        if(this.state.startTime && this.state.endTime) {
            newEvent.startTime = this.state.startTime;
            newEvent.endTime = this.state.endTime;
        }
        
        if(this.state.description) {
            newEvent.description = this.state.description;
        }
    
        databaseUtils.addEvent(newEvent)
        .then(newEventId => {
            newEvent._id = newEventId;
            this.setState({
                events: [...this.state.events, newEvent]
            }, () => {
                GLOBAL_VARIABLES.events = [...this.state.events, newEvent]
            })
        })
    }

    async deleteEvent(e, eventId) {
        e.preventDefault();
        // copy tasks array
        let toUpdateEvents = [];
        
        // Delete task
        databaseUtils.deleteEvent(eventId);
    
        // update temporary tasks array
        this.state.events.forEach(event => {
          if(event._id === eventId) return;
          else toUpdateEvents.push(task);
        });
    
        let setStateAsync = (state) => {
          return new Promise((resolve) => {
            this.setState(state, resolve)
          });
        }
        // Reset state
        await setStateAsync({
          events: toUpdateEvents
        });
    }

    // modifyEvent(e, eventId){
    //   e.preventDefault();
    //   let tempDesc = "";
    //   let toUpdateEvents = [];
    //   if (this.state.description !== undefined){
    //     tempDesc = this.state.description;
    //   }

    //   this.state.events.forEach(event => {
    //     if(event._id === eventId) return;
    //     else toUpdateEvents.push(event);
    //   });

    //   let newEvent = {
    //     _id: eventId,
    //     user: GLOBAL_VARIABLES.userId,
    //     name: this.state.name,
    //     dueDate: this.state.dueDate,
    //     description: tempDesc
    //   };

    //   databaseUtils.modifyEvent(newEvent)
    //   .then(resp => {
    //     console.log(resp);
    //     this.setState({
    //       events: [...toUpdateEvents, newEvent]
    //     });
    //   })
    // }
    
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        console.log(name, value, target);
    
        this.setState({
            [name]: value
        });
    }

    render() {
        let numWeeks = 6;
        let firstDayOfMonth = daysMap[getFirstDayOfMonth(this.state.month, this.state.year)];
        let weeks = [];
        let numDaysLastMonth = getNumDaysInMonth(this.state.month - 1);

        for(let i = 0; i < numWeeks; i++) {
            if(i === 0) {
                let firstDayOfWeek = (numDaysLastMonth - firstDayOfMonth);
                weeks.push(<CalendarWeek month={this.state.month} 
                                         year={this.state.year} 
                                         firstDay={firstDayOfWeek} 
                                         firstWeek='true' 
                                         changeHandler={this.handleChange} 
                                         newEventSubmit={this.newEventSubmit} 
                                         deleteEvent={this.deleteEvent}
                                         modifyEvent={this.modifyEvent}
                                         events={this.state.events}
                                         selectedCalendarId={this.state.selectedCalendarId}/>);
            } else {
                let firstDayOfWeek = 7*i - daysMap[getFirstDayOfMonth(this.state.month, this.state.year)];
                weeks.push(<CalendarWeek month={this.state.month} 
                                         year={this.state.year} 
                                         firstDay={firstDayOfWeek} 
                                         firstWeek='false' 
                                         changeHandler={this.handleChange} 
                                         newEventSubmit={this.newEventSubmit}
                                         deleteEvent={this.deleteEvent}
                                         modifyEvent={this.modifyEvent}
                                         events={this.state.events}
                                         selectedCalendarId={this.state.selectedCalendarId}/>);
            }
        }

        let dayNames = [];
        for(let i = 0; i < daysInWeek.length; i++) {
            dayNames.push(<DayName dayName={daysInWeek[i]} />);
        }

        return (
            <div className='calendar'>
                <div className='calendar-monthbar'>
                    <button className='calendar-monthbar-previous' onClick={this.previousMonth}>Back</button>
                    <p id='calendar-month'><b>{monthNames[this.state.month] + ', ' + this.state.year}</b></p>
                    <button className='calendar-monthbar-next' onClick={this.nextMonth}>Forward</button>
                </div>
                <div className='calendar-day-container'>
                    <div className='calendar-day-names'>
                        { dayNames }
                    </div>
                    <div className='calendar-days'>
                        { weeks }
                    </div>
                </div>
            </div>
        );

    }
}

function CalendarWeek(props) {
    let days = [];
    let numDaysThisMonth = getNumDaysInMonth(props.month);
    let firstDayOfWeek = props.firstDay;

    if(props.firstWeek === 'true') {
        firstDayOfWeek = -1 * daysMap[getFirstDayOfMonth(props.month, props.year)];
    }

    const calIdInSelected = (calId, child=props.selectedCalendarId) => {
        let calIdInChildren = false;
        if(!child) return false;
        console.log('Checking: ', GLOBAL_VARIABLES.calendars[child].name)
        if(calId === child) return true;
        else {
            GLOBAL_VARIABLES.calendars[child].children.forEach(childId => {
                calIdInChildren = calIdInChildren || calIdInSelected(calId, childId);
            });
            return calIdInChildren;
        }
    }

    for(let i = 0; i < 7; i++) {
        if(firstDayOfWeek < 0 || firstDayOfWeek >= numDaysThisMonth) {
            days.push(<CalendarDay disabled={true}/>);
            firstDayOfWeek++;
        } else {
            firstDayOfWeek++;
            let eventsToday = [];
            props.events.forEach(event => {
                if(JSON.stringify(event.date) === JSON.stringify(new Date(props.year, props.month, firstDayOfWeek)) && calIdInSelected(event.calendar)) {
                    console.log('event date is equal to this day');
                    eventsToday.push(event);
                }
            });
            if(eventsToday.length === 0)
                days.push(<CalendarDay day={firstDayOfWeek} changeHandler={props.changeHandler} newEventSubmit={props.newEventSubmit} deleteEvent={props.deleteEvent} modifyEvent={props.modifyEvent} selectedCalendarId={props.selectedCalendarId}/>);
            else
                days.push(<CalendarDay day={firstDayOfWeek} changeHandler={props.changeHandler} newEventSubmit={props.newEventSubmit} deleteEvent={props.deleteEvent} modifyEvent={props.modifyEvent} selectedCalendarId={props.selectedCalendarId} events={eventsToday}/>);
        }
    }

    return (
        <div className='calendar-days-week'>
            { days }
        </div>
    );
}

function CalendarDay(props) {
    if(props.disabled) {
        return (
            <div className='calendar-days-day' disabled='true'>
            </div>
        );
    }

    let events = [];
    if(props.events) {
        props.events.forEach(event => {
            events.push(<Event event={event} deleteEvent={props.deleteEvent} modifyEvent={props.modifyEvent}/>);
        });
    }

    return (
        <div className='calendar-days-day' style={{'display': 'flex', 'flex-direction': 'column'}}>
            <p style={{'margin-bottom': '0'}}>{props.day}</p>
            <div className="daily-events" style={{'display': 'flex', 'flex-direction': 'column'}}>
                {events}
            </div>
            <div className="event-dialogue">
                <EventDialogue changeHandler={props.changeHandler} newEventSubmit={props.newEventSubmit} day={props.day} selectedCalendarId={props.selectedCalendarId}/>
            </div>
        </div>
    );
}

// Actual event user can see and interact with
function Event(props){
    console.log(props);
    return (
        <Popup trigger={<button>{props.event.name}</button>}>
            {close => (
                <div classname="eventInfo">
                    <p>Start Time: {props.event.startTime}</p>
                    <p>End Time: {props.event.endTime}</p>
       
                    <form>
                        <label>Change event logistics here!</label>
                        <label>Event Name</label>
                        <div>
                        <input type='text' name='event-name' placeholder="Event Name"></input>
                        </div>

                        <label>Event Date</label>
                        <div>
                        <input type='date' name='event-date' placeholder="Event Date"></input>
                        </div>

                        <label>Start Time</label>
                        <div>
                        <input type='time' name='event-start-time'></input>
                        </div>

                        <label>End Time</label>
                        <div>
                        <input type='time' name='event-end-time'></input>
                        </div>

                        <div class="eventButton">
                        <button id="event-delete" onClick={(e) =>  props.deleteEvent(e, props.event._id)}>Delete Event</button>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
    );
}

function DayName(props) {
    return (
        <div className='calendar-day-name'>
            <p>{props.dayName}</p>
        </div>
        
    );
}

function EventDialogue(props){
    return (
        <Popup trigger={<button onClick={() => {if(props.selectedCalendarId === '') alert('Select a calendar first!')}}><i class="fas fa-plus"></i></button>}>
            {close => (
                <div classname="eventSubmit">
                    <form>
                        <label>Create your event here!</label>
                        <label>Event Name</label>
                        <div>
                            <input type='text' name='name' placeholder="Event Name" onChange={props.changeHandler}></input>
                        </div>

                        <label>Start Time</label>
                        <div>
                            <input type='time' name='startTime' onChange={props.changeHandler}></input>
                        </div>

                        <label>End Time</label>
                        <div>
                            <input type='time' name='endTime' onChange={props.changeHandler}></input>
                        </div>

                        <label>Description</label>
                        <div>
                            <input type='text' name='description' placeholder="Description" onChange={props.changeHandler}></input>
                        </div>

                        <div class="eventButton">
                        <button id="add-create" onClick={(e) => props.newEventSubmit(e, props.day)}>Add Event</button>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
    );
}

export default Calendar;