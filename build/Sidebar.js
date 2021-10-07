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
      trigger: /* @__PURE__ */ React.createElement("button", null, "Add Event")
    }, (close) => /* @__PURE__ */ React.createElement("div", {
      classname: "eventSubmit"
    }, /* @__PURE__ */ React.createElement("form", {
      action: "/createEvent",
      classname: "eventForm",
      method: "POST"
    }, /* @__PURE__ */ React.createElement("label", null, "Create your event here!"), /* @__PURE__ */ React.createElement("label", null, "Event Name"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      name: "event-name",
      placeholder: "Event Name"
    })), /* @__PURE__ */ React.createElement("label", null, "Event Date"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
      type: "date",
      name: "event-date",
      placeholder: "Event Date"
    })), /* @__PURE__ */ React.createElement("label", null, "Start Time"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
      type: "time",
      name: "event-start-time"
    })), /* @__PURE__ */ React.createElement("label", null, "End Time"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
      type: "time",
      name: "event-end-time"
    })), /* @__PURE__ */ React.createElement("div", {
      class: "eventButton"
    }, /* @__PURE__ */ React.createElement("button", {
      id: "event-create"
    }, "Create Event")))))));
  }
}
export default Sidebar;
