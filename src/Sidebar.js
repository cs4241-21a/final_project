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
          <Popup trigger={<button>Add Event</button>}>
            {close => (
              <div classname="eventSubmit">
                <form action= '/createEvent' classname="eventForm" method="POST">
                  <label>Create your event here!</label>
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
                    <button id="event-create">Create Event</button>
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