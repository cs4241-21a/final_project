import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';
import CalendarSidebarItem from './Sidebar'

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

class Task extends Component {
    constructor(properties) {
        super(properties);
        this.state = properties;
    }

    render() {
        let description = "No Description";
        if(this.state.description !== undefined){
            description = this.state.description;
        }
        /*let month = monthNames[this.state.dueDate.getMonth()];
        let day = daysInWeek[this.state.dueDate.getDay()];
        let year = this.state.dueDate.getFullYear();
        let hour = this.state.dueDate.getHours();
        let minutes = this.state.dueDate.getMinutes();
        let dateString = month + " " + day + ", " + year + " at " + hour + ":" + minutes;*/
        return (
          <Collapsible trigger={this.state.name}>
            <p>Description: {description}</p>
            <p>Owner: {this.state.user}</p>
            <p>Due Date: {this.state.dueDate}</p>
          </Collapsible>
        );
      }
}

export default Task;