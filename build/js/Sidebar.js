import React, {Component} from "../_snowpack/pkg/react.js";
import Popup from "../_snowpack/pkg/reactjs-popup.js";
import Collapsible from "../_snowpack/pkg/react-collapsible.js";
import "../_snowpack/pkg/reactjs-popup/dist/index.css.proxy.js";
import databaseUtils from "./databaseUtils.js";
import {GLOBAL_VARIABLES} from "./globals.js";
import Task from "./Task.js";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: GLOBAL_VARIABLES.calendars,
      tasks: GLOBAL_VARIABLES.tasks,
      calendarSidebarItems: [],
      taskSidebarItems: [],
      color: "#000000"
    };
    this.newCalendarSubmit = this.newCalendarSubmit.bind(this);
    this.newTaskSubmit = this.newTaskSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectCalendar = this.selectCalendar.bind(this);
    console.log(GLOBAL_VARIABLES.calendars);
    console.log(GLOBAL_VARIABLES.tasks);
  }
  selectCalendar(event) {
    console.log(event);
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
    databaseUtils.addCalendar(newCalendar).then((newCalId) => {
      newCalendar._id = newCalId;
      this.setState({
        calendars: [...this.state.calendars, newCalendar]
      });
    });
  }
  newTaskSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    let tempDesc = "";
    if (this.state.description !== void 0) {
      tempDesc = this.state.description;
    }
    let newTask = {
      user: GLOBAL_VARIABLES.userId,
      name: this.state.name,
      dueDate: this.state.dueDate,
      description: tempDesc
    };
    console.log(newTask);
    databaseUtils.addTask(newTask).then((newTaskId) => {
      newTask._id = newTaskId;
      this.setState({
        tasks: [...this.state.tasks, newTask]
      });
    });
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    console.log(name, value, target);
    this.setState({
      [name]: value
    });
  }
  render() {
    let calendarSidebarItems = [];
    this.state.calendars.forEach((calendar) => {
      calendarSidebarItems.push(/* @__PURE__ */ React.createElement(CalendarSidebarItem, {
        calendar,
        customOnClick: this.selectCalendar
      }));
    });
    let taskSidebarItems = [];
    this.state.tasks.forEach((task) => {
      taskSidebarItems.push(/* @__PURE__ */ React.createElement(Task, {
        task
      }));
    });
    console.log(taskSidebarItems);
    return /* @__PURE__ */ React.createElement("div", {
      className: "sidebar"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "sidebar-calendars"
    }, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
      className: "calendarSidebarView"
    }, /* @__PURE__ */ React.createElement("h3", null, "Calendars"), /* @__PURE__ */ React.createElement(Popup, {
      trigger: /* @__PURE__ */ React.createElement("button", null, "New Calendar"),
      position: "right center"
    }, (close) => /* @__PURE__ */ React.createElement("div", {
      classname: "calendarSubmit"
    }, /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("label", {
      htmlFor: "name"
    }, "New Calendar"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      name: "name",
      placeholder: "Calendar Name",
      onChange: this.handleChange,
      required: true
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
      type: "color",
      name: "color",
      onChange: this.handleChange
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: this.newCalendarSubmit
    }, "Create Calendar")))), /* @__PURE__ */ React.createElement("div", {
      className: "calendarSidebarItems"
    }, calendarSidebarItems)), /* @__PURE__ */ React.createElement("div", {
      className: "taskSidebarView"
    }, /* @__PURE__ */ React.createElement("h3", null, "Tasks"), /* @__PURE__ */ React.createElement(Popup, {
      trigger: /* @__PURE__ */ React.createElement("button", null, "New Task"),
      position: "right center"
    }, (close) => /* @__PURE__ */ React.createElement("div", {
      classname: "taskSubmit"
    }, /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("label", {
      htmlFor: "name"
    }, "New Task"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      name: "name",
      placeholder: "Task Name",
      onChange: this.handleChange,
      required: true
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "description"
    }, "Description"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      name: "description",
      placeholder: "Description",
      onChange: this.handleChange
    }), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "dueDate"
    }, "Due Date"), /* @__PURE__ */ React.createElement("input", {
      type: "datetime-local",
      name: "dueDate",
      onChange: this.handleChange,
      required: true
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: this.newTaskSubmit
    }, "Create Task")))), /* @__PURE__ */ React.createElement("div", {
      className: "taskSidebarItems"
    }, taskSidebarItems))));
  }
}
class CalendarSidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    let children = [];
    if (!this.state.calendar.children.length === 0) {
      console.log(this.state.calendar.children);
      this.state.calendar.children.forEach((child) => {
        children.push(/* @__PURE__ */ React.createElement(CalendarSidebarItem, {
          name: child.name,
          children: child.children,
          style: {padding: "10px"},
          customOnClick: this.state.customOnClick
        }));
      });
    }
    return /* @__PURE__ */ React.createElement(Collapsible, {
      trigger: this.state.calendar.name,
      style: this.state.style,
      onClick: this.state.customOnClick
    }, children);
  }
}
export default Sidebar;
