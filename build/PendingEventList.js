import React from "./_snowpack/pkg/react.js";
import AvailabilitySchedule from "./AvailabilitySchedule.js";
class PendingEventList extends React.Component {
  async load() {
    await fetch("/pendingEvents", {
      headers: {
        "Cache-Control": "no-cache"
      }
    }).then((response) => response.json()).then((response) => {
      for (let event of response.events.values()) {
        event.availability = [];
      }
      this.setState({
        events: response.events,
        username: response.username
      });
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      username: ""
    };
    this.load();
    this.addUserAvail = this.addUserAvail.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }
  updateEvent(eventID, selection) {
    let newEvents = this.state.events;
    let event = null;
    for (let currEvent of newEvents) {
      if (currEvent._id === eventID) {
        event = currEvent;
        break;
      }
    }
    if (event == null) {
      throw new Error(eventID + " not found in events state");
    } else {
      event.availability = selection;
      this.setState({
        events: newEvents,
        username: this.state.username
      });
    }
  }
  addUserAvail(event) {
    const json = {
      eventID: event._id,
      attendeesAvailArray: event.availability
    }, body = JSON.stringify(json);
    fetch("/addUserAvail", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      window.location.reload();
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, this.state.events.map((event) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, event.eventName), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Description: ", event.description), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Location: ", event.location), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Attendees:"), /* @__PURE__ */ React.createElement("ul", null, event.attendees.map((attendee) => /* @__PURE__ */ React.createElement("li", null, attendee))), /* @__PURE__ */ React.createElement("br", null), event.chosenEventDate === null || event.chosenEventTime === null ? /* @__PURE__ */ React.createElement("p", null, "Event date/time has not been chosen yet") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Event Date:"), /* @__PURE__ */ React.createElement("p", null, event.chosenEventDate), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Event Time:"), /* @__PURE__ */ React.createElement("p", null, event.chosenStartTime)), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Open Days and Time Slots: Click and submit to update availability"), /* @__PURE__ */ React.createElement("div", {
      class: "containerRow"
    }, /* @__PURE__ */ React.createElement(AvailabilitySchedule, {
      event,
      username: this.state.username,
      updateEvent: this.updateEvent
    }), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      style: {maxHeight: "45px"},
      onClick: (clickEvent) => this.addUserAvail(event)
    }, "Update Availability"))), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null))));
  }
}
export default PendingEventList;
