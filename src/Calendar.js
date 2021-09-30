import React, { Component } from 'react';

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

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        };
        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
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

    render() {
        let numWeeks = 5;
        let firstDayOfMonth = daysMap[getFirstDayOfMonth(this.state.month, this.state.year)];
        let weeks = [];
        let dayNames = [];
        let numDaysLastMonth = getNumDaysInMonth(this.state.month - 1);
        let firstDayOfWeek = numDaysLastMonth - firstDayOfMonth;

        for(let i = 0; i < numWeeks; i++) {
            if(i === 0) {
                weeks.push(<CalendarWeek month={this.state.month} year={this.state.year} firstDay={firstDayOfWeek} firstWeek='true'/>);
            } else {
                firstDayOfWeek = 7*i - firstDayOfMonth;
                weeks.push(<CalendarWeek month={this.state.month} year={this.state.year} firstDay={firstDayOfWeek} firstWeek='false'/>);
            }
        }

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
    let numDaysLastMonth = getNumDaysInMonth(props.month - 1);
    let numDaysThisMonth = getNumDaysInMonth(props.month);
    let firstDayOfWeek = props.firstDay;
    if(firstDayOfWeek === numDaysLastMonth) {
        firstDayOfWeek = 0;
    }

    for(let i = 0; i < 7; i++) {
        days.push(<CalendarDay day={++firstDayOfWeek}/>);
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
        </div>
    );
}

function DayName(props) {
    return (
        <div className='calendar-day-name'>
            <p>{props.dayName}</p>
        </div>
    );
}

export default Calendar;