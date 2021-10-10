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

let calendarState = {
    events: GLOBAL_VARIABLES.events
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            events: GLOBAL_VARIABLES.events
        };
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.newEventSubmit = this.newEventSubmit.bind(this);

        console.log("All Events:")
        console.log(GLOBAL_VARIABLES.events);
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

    newEventSubmit(e){
        e.preventDefault();
        console.log(this.state)
    
        //Make new event. Relying on this.state is probably a bad idea.
        let newEvent = {
            user: GLOBAL_VARIABLES.userId,
            name: this.state.name, 
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            description: this.state.description,
            calendar: GLOBAL_VARIABLES.selectedCalendarId
        };
    
        databaseUtils.addEvent(newEvent)
        .then(newEventId => {
            newEvent._id = newEventId;
            this.setState({
                events: [...this.state.events, newEvent]
            })
        })
    }

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
        let numWeeks = 5;
        let firstDayOfMonth = daysMap[getFirstDayOfMonth(this.state.month, this.state.year)];
        let weeks = [];
        let dayNames = [];
        let numDaysLastMonth = getNumDaysInMonth(this.state.month - 1);
        let firstDayOfWeek = numDaysLastMonth - firstDayOfMonth;

        for(let i = 0; i < numWeeks; i++) {
            if(i === 0) {
                weeks.push(<CalendarWeek month={this.state.month} year={this.state.year} firstDay={firstDayOfWeek} firstWeek='true' changeHandler={this.handleChange} newEventSubmit={this.newEventSubmit}/>);
            } else {
                firstDayOfWeek = 7*i - firstDayOfMonth;
                weeks.push(<CalendarWeek month={this.state.month} year={this.state.year} firstDay={firstDayOfWeek} firstWeek='false' changeHandler={this.handleChange} newEventSubmit={this.newEventSubmit}/>);
            }
        }

        for(let i = 0; i < daysInWeek.length; i++) {
            dayNames.push(<DayName dayName={daysInWeek[i]} events={DailyEvents()} />);
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
    let numDaysLastMonth = getNumDaysInMonth(props.month - 1);
    let numDaysThisMonth = getNumDaysInMonth(props.month);
    let firstDayOfWeek = props.firstDay;
    if(firstDayOfWeek === numDaysLastMonth) {
        firstDayOfWeek = 0;
    }

    for(let i = 0; i < 7; i++) {
        days.push(<CalendarDay day={++firstDayOfWeek} changeHandler={props.changeHandler} newEventSubmit={props.newEventSubmit} events={DailyEvents()}/>);
        if(firstDayOfWeek === numDaysLastMonth && (props.firstWeek === 'true')) firstDayOfWeek = 0;
        if(firstDayOfWeek === numDaysThisMonth && (props.firstWeek === 'false')) firstDayOfWeek = 0;
    }

    return (
        <div className='calendar-days-week'>
            { days }
        </div>
    );
}

function CalendarDay(props) {
    
    return (
        <div className='calendar-days-day'>
            <p>{props.day}</p>
            <div className="daily-events">
                
            </div>
            <div className="event-dialogue">
                <EventDialogue changeHandler={props.changeHandler} newEventSubmit={props.newEventSubmit}/>
            </div>
        </div>
        
    );
}

function Event(props){
    return (
        <Popup trigger={<button>{props.events[0].name}</button>}>
            {close => (
                <div classname="eventInfo">
                    <p>Start Time: {props.events[0].startTime}</p>
                    <p>End Time: {props.events[0].endTime}</p>
       
                    <form action= '/modifyEvent' classname="eventForm" method="POST">
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
                        <button id="event-modify">Modify Event</button>
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
/**
 * Make a form for creating an event
 * @returns 
 */
function EventDialogue(props){
    console.log(props);
    return (
        <Popup trigger={<button>Add Event</button>}>
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
                        <button id="add-create" onClick={props.newEventSubmit}>Add Event</button>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
    );
}

/**
 * POST request for a new event submission
 * @param {*} e - event handler being passed in
 */
function newEventSubmit(e){
    e.preventDefault();
    console.log("submitting a new event...")

    //Make new event. Relying on this.state is probably a bad idea.
    let newEvent = {
        user: GLOBAL_VARIABLES.userId,
        name: this.state.name, //change
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        description: this.state.description,
        calendar: this.state.calendar
    };

    databaseUtils.addEvent(newEvent)
    .then(newEventId => {
        newEvent._id = newEventId;
        this.setState({
            events: [...this.state.events, newEvent]
        })
    })
}

/**
 * 
 * @returns A JSON array of events
 */
function DailyEvents(){
    let eventNameList = [];
    let eventStartTimeList = [];
    let eventEndTimeList = [];

    let eventList = [];

    //Loop through all events to see if any of them are on the same day
    for(const event of GLOBAL_VARIABLES.events){
        if(event.startTime.getDay() === props.day){
            //push the name
            eventNameList.push(event.name);

            //Make string to easily convey start and end time in terms of hours and minutes
            let startTimeString = event.startTime.getHours() + ":" + event.startTime.getMinutes();
            let endTimeString = event.endTime.getHours() + ":" + event.endTime.getMinutes();

            eventStartTimeList.push(startTimeString);
            eventEndTimeList.push(endTimeString);
        }
    }

    for(let i = 0; i < eventNameList.length; i++){
        let eventJson = {eventName: eventNameList[i], 
                         eventStartTime: eventStartTimeList[i], 
                         eventEndTime: eventEndTimeList[i]};
        eventList.push(eventJson);
    }

    return eventList;
}

export default Calendar;