import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-calendars'>
          <p>Calendars</p>
          <Popup trigger={<button>Add Calendar</button>}>
            {close => (
              <div classname="calendarSubmit">
                <form action= '/addCalendar' classname="calendarForm" method="POST">
                  <label>Create your calendar here!</label>
                  <label>Calendar Name</label>
                  <div>
                    <input type='text' name='calendar-name' placeholder="Calendar Name"></input>
                  </div>

                  <div class="calendarButton">
                    <button id="calendar-create">Create Calendar</button>
                  </div>
                  
                </form>
              </div>
            )}
          </Popup>
        </div>
      </div>
      );
  }
}

export default Sidebar;