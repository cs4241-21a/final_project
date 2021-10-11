import React from "./_snowpack/pkg/react.js";
import OwnedEventList from "./OwnedEventList.js";
import PendingEventsList from "./PendingEventList.js";
class EventsApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      class: "col-sm-5 m-4 p-3"
    }, /* @__PURE__ */ React.createElement("h2", null, "My Events"), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(OwnedEventList, null)), /* @__PURE__ */ React.createElement("div", {
      class: "w-100"
    }), /* @__PURE__ */ React.createElement("div", {
      class: "col-sm-5 m-4 p-3"
    }, /* @__PURE__ */ React.createElement("h2", null, "Pending Event Invites:"), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(PendingEventsList, null)));
  }
}
export default EventsApp;
