import React from "./_snowpack/pkg/react.js";
import AvailabilitySchedule from "./AvailabilitySchedule.js";
class PendingEventList extends React.Component {
  load() {
    fetch("/pendingsEvents").then((response) => response.json()).then((response) => {
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
  convertSelectionToAvailability(selection) {
    console.log(selection);
  }
  updateEvent(eventID, selection) {
    let newEvents = this.state.events;
    for (let event of newEvents) {
      if (event._id === eventID) {
        event.availability = selection;
        this.setState({
          events: newEvents,
          username: this.state.username
        });
        return;
      }
    }
    throw new Error(eventID + " not found in events state");
  }
  addUserAvail(event) {
    async function buttonClickEvent() {
      const json = {
        eventID: event._id,
        attendeesAvailArray: event.availability
      }, body = JSON.stringify(json);
      await fetch("/addUserAvail", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      });
      window.location.reload();
    }
    return buttonClickEvent;
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, this.state.events.map((event) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, event.eventName), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Description: ", event.description), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Location: ", event.location), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Attendees:"), /* @__PURE__ */ React.createElement("ul", null, event.attendees.map((attendee) => /* @__PURE__ */ React.createElement("li", null, attendee))), /* @__PURE__ */ React.createElement("br", null), event.chosenEventDate === null || event.chosenEventTime === null ? /* @__PURE__ */ React.createElement("p", null, "Event date/time has not been chosen yet") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Event Date:"), /* @__PURE__ */ React.createElement("p", null, event.chosenEventDate), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Event Time:"), /* @__PURE__ */ React.createElement("p", null, event.chosenStartTime)), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Open Days and Time Slots: Click and submit to update availability"), /* @__PURE__ */ React.createElement(AvailabilitySchedule, {
      event,
      username: this.state.username,
      updateEvent: this.updateEvent
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onclick: this.addUserAvail(event)
    }, "Accept Invite")), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null))));
  }
}
export default PendingEventList;
