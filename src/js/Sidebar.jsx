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
      taskSidebarItems: [],
      color: '#000000'
    };
    this.newCalendarSubmit = this.newCalendarSubmit.bind(this);
    this.deleteCalendar = this.deleteCalendar.bind(this);
    this.modifyCalendar = this.modifyCalendar.bind(this);
    this.newTaskSubmit = this.newTaskSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectCalendar = this.selectCalendar.bind(this);
    this.deselectCalendar = this.deselectCalendar.bind(this);
  }

  selectCalendar(calId) {
    GLOBAL_VARIABLES.selectedCalendarId = calId;
  }

  // TODO: Need to implement this somewhere
  deselectCalendar(calId) {
    GLOBAL_VARIABLES.selectedCalendarId = '';
    console.log(GLOBAL_VARIABLES.selectedCalendarId);
  }

  async deleteCalendar(calId) {
    let toUpdateCalendars = JSON.parse(JSON.stringify(this.state.calendars));
    console.log(toUpdateCalendars);
    // console.log(toUpdateCalendars);
    let calToDelete = toUpdateCalendars[calId];
    let childrenToDelete = calToDelete.children;
    let parentToUpdate = calToDelete.parent === '' ? undefined : toUpdateCalendars[calToDelete.parent];
    // console.log(parentToUpdate);
    // Delete all children of calendar
    childrenToDelete.forEach(childId => {
      this.deleteCalendar(childId);
      databaseUtils.deleteCalendar(childId);
      delete toUpdateCalendars[childId];
    });

    // Delete all references to calendar in parent
    if(parentToUpdate) {
      let idToRemoveIndex = parentToUpdate.children.indexOf(calId);
      parentToUpdate.children.splice(idToRemoveIndex, 1);
      databaseUtils.modifyCalendar(parentToUpdate);
    }

    // Delete calendar
    databaseUtils.deleteCalendar(calId);
    delete toUpdateCalendars[calId];
    console.log(toUpdateCalendars);

    let setStateAsync = (state) => {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }
    // Reset state
    await setStateAsync({
      calendars: toUpdateCalendars
    });
    console.log(this.state.calendars)
  }

  modifyCalendar(calId) {
    // TODO: Write function
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
      // Update children, locally and on database
      let selectedCalendarId = GLOBAL_VARIABLES.selectedCalendarId;
      // Update local
      if(selectedCalendarId !== '') {
        // Append to children the new calendar
        let currentStateCalendars = JSON.parse(JSON.stringify(this.state.calendars));
        currentStateCalendars[selectedCalendarId].children.push(newCalId);
        currentStateCalendars[newCalId] = newCalendar;
        // Update locally and on database
        this.setState({
          calendars: currentStateCalendars
        }, () => {
          GLOBAL_VARIABLES.calendars = this.state.calendars
          databaseUtils.modifyCalendar(this.state.calendars[selectedCalendarId]);
        })

      } else {
        // Just add the calendar to the list of global calendars
        let currentStateCalendars = JSON.parse(JSON.stringify(this.state.calendars));
        currentStateCalendars[newCalId] = newCalendar;
        this.setState({
          calendars: currentStateCalendars
        }, () => { GLOBAL_VARIABLES.calendars = this.state.calendars });
      }
    })
  }

  newTaskSubmit(e) {
    e.preventDefault();
    console.log(this.state);
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
    console.log(newTask);
    databaseUtils.addTask(newTask)
    .then(newTaskId => {
      newTask._id = newTaskId;
      this.setState({
        tasks: [...this.state.tasks, newTask]
      });
    })
  }

  async deleteTask(taskId) {
    // copy tasks array
    let toUpdateTasks = JSON.parse(JSON.stringify(this.state.tasks));
    
    // Delete task
    databaseUtils.deleteTask(taskId);

    // update temporary tasks array
    delete toUpdateTasks[taskId];

    let setStateAsync = (state) => {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }
    // Reset state
    await setStateAsync({
      tasks: toUpdateTasks
    });
    console.log(this.state.tasks)

    // Reset state with updated tasks array
    this.setState({
      tasks: toUpdateTasks
    });
  }

  modifyTask(taskId){
    // TODO: Write function
  }
  
  // Handles the change of a form field; useful for updating state which is
  // needed to send right variables to server
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  render() {
    // console.log(this.state);
    let calendarSidebarItems = [];
    for(const [calId, calendar] of Object.entries(this.state.calendars)) {
      if(calendar.parent === '') {
        calendarSidebarItems.push(<CalendarSidebarItem calendars={this.state.calendars}
                                  calendarId={calId}
                                  delete={this.deleteCalendar}
                                  modify={this.modifyCalendar}
                                  handleChange={this.handleChange}
                                  customOnClick={this.selectCalendar}/>);
      }
    }

    let taskSidebarItems = [];
    this.state.tasks.forEach(task => {
      taskSidebarItems.push(<Task task={task}/>);
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
                      <input type="datetime-local"
                             name="dueDate"
                             onChange={this.handleChange}
                             required></input>
                      <button onClick={this.newTaskSubmit}>Create Task</button>
                    </form>
                  </div>  
                )}
            </Popup>
            <div className="taskSidebarItems">
                {taskSidebarItems}
            </div>
        </div>
      </div>
    </div>
    );
  }
}

function CalendarSidebarItem(props) {
  let children = [];
  if(props.calendars[props.calendarId].children.length !== 0) {
    props.calendars[props.calendarId].children.forEach(child => {
      children.push(<CalendarSidebarItem calendars={props.calendars}
                                         calendarId={child}
                                         style={{padding: '10px'}}
                                         delete={props.delete}
                                         modify={props.modify}
                                         handleChange={props.handleChange}
                                         customOnClick={() => props.customOnClick(child)}/>)});
  }

  return (
    <div>
      <button onClick={() => props.delete(props.calendarId)}><i class="far fa-trash-alt"></i></button>
      <Popup trigger={<button><i class="far fa-edit"></i></button>} position="right center">
        {close => (
              <div classname="calendarEdit">
                <form>
                  <label htmlFor="name">Edit Calendar</label>
                  <input type='text' 
                         name='name'
                         placeholder="Calendar Name" 
                         onChange={props.handleChange}
                         required/>
                  <br />
                  <input type="color" name="color" onChange={props.handleChange} />
                  <button onClick={() => props.modify(props.calendarId)}>Update</button>
                </form>
              </div>
              )}
      </Popup>
      <Collapsible 
          trigger={props.calendars[props.calendarId].name} 
          style={props.style} 
          onOpening={() => props.customOnClick(props.calendarId)}
          onClosing={() => props.customOnClick(props.calendarId)}>
        {children}
      </Collapsible>
    </div>
  );
}

export default Sidebar;