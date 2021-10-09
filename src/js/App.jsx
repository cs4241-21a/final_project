import React from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import '../css/App.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';
import { ThreeSixtySharp } from '@material-ui/icons';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      calendars: [],
      tasks: [],
      userId: '',
      selectedCalendarId: '',
      eventsLoaded: false,
      calendarsLoaded: false,
      tasksLoaded: false,
      userIdLoaced: false
    };
  }

  componentWillMount() {
    this.retrieveAllGlobals();
  }
  
  retrieveAllGlobals() {
    databaseUtils.getUserID()
    .then(userID => {
      GLOBAL_VARIABLES.userId = userID;
      this.setState({
        userId: userID,
        userIdLoaced: true
      });
    });

    databaseUtils.getAllCalendars()
    .then(calendars => {
      GLOBAL_VARIABLES.calendars = JSON.parse(calendars);
      this.setState({
        calendars: calendars,
        calendarsLoaded: true
      });
    });

    databaseUtils.getAllEvents()
    .then(events => {
      GLOBAL_VARIABLES.events = JSON.parse(events);
      this.setState({
        events: events,
        eventsLoaded: true
      });
    });

    databaseUtils.getAllTasks()
    .then(tasks => {
      GLOBAL_VARIABLES.tasks = JSON.parse(tasks);
      this.setState({
        tasks: tasks,
        tasksLoaded: true
      });
    });
  }

  render() {
    return (
      <div>
        {
          (this.state.eventsLoaded && this.state.calendarsLoaded && this.state.tasksLoaded && this.state.userIdLoaced)
          ? (<div className="App"> <Sidebar /> <Calendar /> </div>)
          : (<p>Loading</p>)
        }
      </div>
    );
  }
}

export default App;
