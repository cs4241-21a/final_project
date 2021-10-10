import React, {Component} from "../_snowpack/pkg/react.js";
import Collapsible from "../_snowpack/pkg/react-collapsible.js";
import databaseUtils from "./databaseUtils.js";
import {GLOBAL_VARIABLES} from "./globals.js";
import CalendarSidebarItem from "./Sidebar.js";
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
    if (this.state.task.description !== void 0) {
      description = this.state.task.description;
    }
    return /* @__PURE__ */ React.createElement(Collapsible, {
      trigger: this.state.task.name
    }, /* @__PURE__ */ React.createElement("p", null, "Description: ", description), /* @__PURE__ */ React.createElement("p", null, "Owner: ", this.state.task.user), /* @__PURE__ */ React.createElement("p", null, "Due Date: ", this.state.task.dueDate));
  }
}
export default Task;
