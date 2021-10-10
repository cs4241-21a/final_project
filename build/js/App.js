import React from "../_snowpack/pkg/react.js";
import Sidebar from "./Sidebar.js";
import Calendar from "./Calendar.js";
import "../css/App.css.proxy.js";
import databaseUtils from "./databaseUtils.js";
import {GLOBAL_VARIABLES} from "./globals.js";
import {ThreeSixtySharp} from "../_snowpack/pkg/@material-ui/icons.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      calendars: [],
      tasks: [],
      userId: "",
      selectedCalendarId: "",
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
    databaseUtils.getUserID().then((userID) => {
      GLOBAL_VARIABLES.userId = userID;
      this.setState({
        userId: userID,
        userIdLoaced: true
      });
    });
    databaseUtils.getAllCalendars().then((calendars) => {
      GLOBAL_VARIABLES.calendars = JSON.parse(calendars);
      this.setState({
        calendars,
        calendarsLoaded: true
      });
    });
    databaseUtils.getAllEvents().then((events) => {
      GLOBAL_VARIABLES.events = JSON.parse(events);
      this.setState({
        events,
        eventsLoaded: true
      });
    });
    databaseUtils.getAllTasks().then((tasks) => {
      GLOBAL_VARIABLES.tasks = JSON.parse(tasks);
      this.setState({
        tasks,
        tasksLoaded: true
      });
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", null, this.state.eventsLoaded && this.state.calendarsLoaded && this.state.tasksLoaded && this.state.userIdLoaced ? /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, " ", /* @__PURE__ */ React.createElement(Sidebar, null), " ", /* @__PURE__ */ React.createElement(Calendar, null), " ") : /* @__PURE__ */ React.createElement("p", null, "Loading"));
  }
}
export default App;
