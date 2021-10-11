import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Collapsible from 'react-collapsible';
import 'reactjs-popup/dist/index.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';
import Task from './Task';
import CalendarSidebarItem from './CalendarSidebarItem';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: GLOBAL_VARIABLES.calendars,
      tasks: GLOBAL_VARIABLES.tasks,
      calendarSidebarItems: [],
      taskSidebarItems: [],
      color: '#000000',
      changeSelectedCalendar: props.changeSelectedCalendar
    };
    console.log('Selected Calendar: ', GLOBAL_VARIABLES.selectedCalendarId);
    this.newTopCalendarSubmit = this.newTopCalendarSubmit.bind(this);
    this.newChildCalendarSubmit = this.newChildCalendarSubmit.bind(this);
    this.deleteCalendar = this.deleteCalendar.bind(this);
    this.modifyCalendar = this.modifyCalendar.bind(this);
    this.newTaskSubmit = this.newTaskSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.modifyTask = this.modifyTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectCalendar = this.selectCalendar.bind(this);
  }

  selectCalendar(calId) {
    this.state.changeSelectedCalendar(calId);
  }

  async deleteCalendar(calId) {
    let toUpdateCalendars = JSON.parse(JSON.stringify(this.state.calendars));
    let calToDelete = toUpdateCalendars[calId];
    let childrenToDelete = calToDelete.children;
    let parentToUpdate = calToDelete.parent === '' ? undefined : toUpdateCalendars[calToDelete.parent];
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

    let setStateAsync = (state) => {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }
    // Reset state
    await setStateAsync({
      calendars: toUpdateCalendars
    });
  }

  modifyCalendar(e, calId) {
    e.preventDefault();
    let newCalendar = {
      user: GLOBAL_VARIABLES.userId,
      parent: GLOBAL_VARIABLES.selectedCalendarId,
      children: [],
      name: this.state.name,
      color: this.state.color
    };
  }

  newTopCalendarSubmit(e) {
    e.preventDefault();
    let newCalendar = {
      user: GLOBAL_VARIABLES.userId,
      parent: '',
      children: [],
      name: this.state.name,
      color: this.state.color
    };
    databaseUtils.addCalendar(newCalendar)
    .then(newCalId => {
      newCalendar._id = newCalId;
      // Just add the calendar to the list of global calendars
      let currentStateCalendars = JSON.parse(JSON.stringify(this.state.calendars));
      currentStateCalendars[newCalId] = newCalendar;
      this.setState({
        calendars: currentStateCalendars
      }, () => { GLOBAL_VARIABLES.calendars = this.state.calendars });
    })
  }

  newChildCalendarSubmit(e, parentId) {
    e.preventDefault();
    let newCalendar = {
      user: GLOBAL_VARIABLES.userId,
      parent: parentId,
      children: [],
      name: this.state.name,
      color: this.state.color
    };
    databaseUtils.addCalendar(newCalendar)
    .then(newCalId => {
      newCalendar._id = newCalId;
      // Append to children the new calendar
      let currentStateCalendars = JSON.parse(JSON.stringify(this.state.calendars));
      currentStateCalendars[parentId].children.push(newCalId);
      currentStateCalendars[newCalId] = newCalendar;
      // Update locally and on database
      this.setState({
        calendars: currentStateCalendars
      }, () => {
        GLOBAL_VARIABLES.calendars = this.state.calendars
        databaseUtils.modifyCalendar(this.state.calendars[parentId]);
      })
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
      this.setState({
        tasks: [...this.state.tasks, newTask]
      });
    })
  }

  async deleteTask(taskId) {
    // copy tasks array
    let toUpdateTasks = [];
    
    // Delete task
    databaseUtils.deleteTask(taskId);

    // update temporary tasks array
    this.state.tasks.forEach(task => {
      if(task._id === taskId) return;
      else toUpdateTasks.push(task);
    });

    let setStateAsync = (state) => {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }
    // Reset state
    await setStateAsync({
      tasks: toUpdateTasks
    });
  }

  modifyTask(e, taskId){
    e.preventDefault();
    let tempDesc = "";
    let toUpdateTasks = [];
    if (this.state.description !== undefined){
      tempDesc = this.state.description;
    }
    
    this.state.tasks.forEach(task => {
      if(task._id === taskId) return;
      else toUpdateTasks.push(task);
    });
    
    let newTask = {
      _id: taskId,
      user: GLOBAL_VARIABLES.userId,
      name: this.state.name,
      dueDate: this.state.dueDate,
      description: tempDesc
    };
    
    databaseUtils.modifyTask(newTask)
    .then(resp => {
      console.log(resp);
      this.setState({
        tasks: [...toUpdateTasks, newTask]
      });
    })
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
                                  customOnClick={this.selectCalendar}
                                  addChild={this.newChildCalendarSubmit}/>);
      }
    }

    let taskSidebarItems = [];
    this.state.tasks.forEach(task => {
      taskSidebarItems.push(<Task task={task}
                                  handleChange={this.handleChange}
                                  delete={this.deleteTask}
                                  modify={this.modifyTask}/>);
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
                    <button onClick={this.newTopCalendarSubmit}>Create Calendar</button>
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
                             onChange={this.handleChange}
                             required />

                      <label htmlFor="dueDate">Due Date</label>
                      <input type="datetime-local"
                             name="dueDate"
                             onChange={this.handleChange}
                             required />
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

// function CalendarSidebarItem(props) {
//   let children = [];
//   if(props.calendars[props.calendarId].children.length !== 0) {
//     props.calendars[props.calendarId].children.forEach(child => {
//       children.push(<CalendarSidebarItem calendars={props.calendars}
//                                          calendarId={child}
//                                          style={{padding: '10px'}}
//                                          delete={props.delete}
//                                          modify={props.modify}
//                                          handleChange={props.handleChange}
//                                          customOnClick={() => props.customOnClick(child)}/>)});
//   }

//   return (
//     <div>
//       <button onClick={() => props.delete(props.calendarId)}><i class="far fa-trash-alt"></i></button>
//       <Popup trigger={<button><i class="far fa-edit"></i></button>} position="right center">
//         {close => (
//               <div classname="calendarEdit">
//                 <form>
//                   <label htmlFor="name">Edit Calendar</label>
//                   <input type='text' 
//                          name='name'
//                          placeholder="Calendar Name" 
//                          onChange={props.handleChange}
//                          required/>
//                   <br />
//                   <input type="color" name="color" onChange={props.handleChange} />
//                   <button onClick={(e) => props.modify(e, props.calendarId)}>Update</button>
//                 </form>
//               </div>
//               )}
//       </Popup>
//       <Collapsible 
//           trigger={props.calendars[props.calendarId].name} 
//           style={props.style} 
//           onOpening={() => props.customOnClick(props.calendarId)}
//           onClosing={() => props.customOnClick(props.calendarId)}>
//         {children}
//       </Collapsible>
//     </div>
//   );
// }

export default Sidebar;