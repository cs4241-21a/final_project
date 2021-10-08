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

class Event extends Component {
    constructor(properties) {
        super(properties);
        this.userID = properties.userID;
        this.eventName = properties.eventName;
        this.startTime = properties.startTime;

        this.allDay = properties.allDay; //boolean
        if (!this.allDay) {
            this.endTime = properties.endTime;
        }
        this.repeat = properties.repeat; // boolean
        if (this.repeat) {

        }
    }
}