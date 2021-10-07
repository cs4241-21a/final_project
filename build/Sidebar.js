import React, {Component} from "./_snowpack/pkg/react.js";
import Popup from "./_snowpack/pkg/reactjs-popup.js";
import "./_snowpack/pkg/reactjs-popup/dist/index.css.proxy.js";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "sidebar"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "sidebar-calendars"
    }, /* @__PURE__ */ React.createElement("p", null, "Calendars"), /* @__PURE__ */ React.createElement(Popup, {
      trigger: /* @__PURE__ */ React.createElement("button", null, "Add Calendar")
    }, (close) => /* @__PURE__ */ React.createElement("div", {
      classname: "calendarSubmit"
    }, /* @__PURE__ */ React.createElement("form", {
      action: "/addCalendar",
      classname: "calendarForm",
      method: "POST"
    }, /* @__PURE__ */ React.createElement("label", null, "Create your calendar here!"), /* @__PURE__ */ React.createElement("label", null, "Calendar Name"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      name: "calendar-name",
      placeholder: "Calendar Name"
    })), /* @__PURE__ */ React.createElement("div", {
      class: "calendarButton"
    }, /* @__PURE__ */ React.createElement("button", {
      id: "calendar-create"
    }, "Create Calendar")))))));
  }
}
export default Sidebar;
