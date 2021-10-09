import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Collapsible from 'react-collapsible';
import 'reactjs-popup/dist/index.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';
import Task from './Task'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: GLOBAL_VARIABLES.calendars,
      tasks: GLOBAL_VARIABLES.tasks,
      calendarSidebarItems: [],
      color: '#000000'
    };
    this.newCalendarSubmit = this.newCalendarSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectCalendar = this.selectCalendar.bind(this);
    console.log(GLOBAL_VARIABLES.calendars);
    console.log(GLOBAL_VARIABLES.tasks);
  }

  selectCalendar(event) {
    console.log(event);
    // GLOBAL_VARIABLES.selectedCalendarId = calendarId;
    // console.log(calendarId);
  }

  newCalendarSubmit(e) {
    e.preventDefault();
    let newCalendar = {
      user: GLOBAL_VARIABLES.userId,
      parent: GLOBAL_VARIABLES.selectedCalendarId,
      children: [],
      name: this.state.name,
      color: this.state.color
    };
    databaseUtils.addCalendar(newCalendar)
    .then(newCalId => {
      newCalendar._id = newCalId;
      this.setState({
        calendars: [...this.state.calendars, newCalendar]
      });
    })
  }

  newTaskSubmit(e) {
    e.preventDefault();

    let tempDesc = "";
    if (this.state.description !== undefined){
      tempDesc = this.state.description;
    }
    let newTask = {
      user: GLOBAL_VARIABLES.userId,
      name: this.state.name,
      dueDate: this.state.dueDate,
      description: tempDesc
    };
    databaseUtils.addTask(newTask)
    .then(newTaskId => {
      newTask._id = newTaskId;
      GLOBAL_VARIABLES.tasks.push(newTask);
    })
  }
  
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  render() {
    let calendarSidebarItems = [];
    this.state.calendars.forEach(calendar => {
      calendarSidebarItems.push(<CalendarSidebarItem calendar={calendar} 
                                customOnClick={this.selectCalendar}/>);
    });
    this.state.tasks.forEach(task => {
      calendarSidebarItems.push(<Task task={task}/>);
    });

    return (
      <div className='sidebar'>
        <div className='sidebar-calendars'>
          <br />
          <div className="calendarSidebarView">
            <h3>Calendars</h3>
            <Popup trigger={<button>New Calendar</button>} position="right center">
              {close => (
                <div classname="calendarSubmit">
                  <form>
                    <label htmlFor="name">New Calendar</label>
                    <input type='text' 
                           name='name'
                           placeholder="Calendar Name" 
                           onChange={this.handleChange}
                           required/>
                    <br />
                    <input type="color" name="color" onChange={this.handleChange} />
                    <button onClick={this.newCalendarSubmit}>Create Calendar</button>
                  </form>
                </div>
              )}
            </Popup>
            <div className="calendarSidebarItems">
              {calendarSidebarItems}
            </div>
          </div>
          <div className="taskSidebarView">
          <h3>Tasks</h3>
          <Popup trigger={<button>New Task</button>} position="right center">
              {close => (
                <div classname="taskSubmit">
                  <form>
                    <label htmlFor="name">New Task</label>
                    <input type='text'
                           name='name'
                           placeholder="Task Name"
                           onChange={this.handleChange}
                           required/>
                    <br />
                    <label htmlFor="description">Description</label>
                    <input type="text" 
                           name="description"
                           placeholder="Description"
                           onChange={this.handleChange}></input>
                           
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="time"
                           name="dueDate"
                           onChange={this.handleTaskChange}
                           required></input>
                    <button onClick={this.newTaskSubmit}>Create Task</button>
                  </form>
                </div>  
              )}
          </Popup>
          </div>
        </div>
      </div>
    );
  }
}

class CalendarSidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    let children = [];
    if(!this.state.calendar.children.length === 0) {
      console.log(this.state.calendar.children)
      this.state.calendar.children.forEach(child => {
        children.push(<CalendarSidebarItem name={child.name} 
                                           children={child.children} 
                                           style={{padding: '10px'}} 
                                           customOnClick={this.state.customOnClick}/>)});
    }

    return (
      <Collapsible trigger={this.state.calendar.name} style={this.state.style} onClick={this.state.customOnClick}>
        {children}
      </Collapsible>
    );
  }
}

export default Sidebar;