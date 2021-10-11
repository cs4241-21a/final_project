import React from "./_snowpack/pkg/react.js";
import ScheduleSelector from "./react-schedule-selector/src/lib/index.js";
class AvailabilitySchedule extends React.Component {
  constructor(props) {
    super(props);
    let event = this.props.event;
    let startDate = new Date(event.availableDates[0]);
    let numDays = event.availableDates.length;
    let hourlyChunks = 1 / event.meetingDuration;
    let minTime = event.availableTimes[0][0];
    let maxTime = event.availableTimes[0][event.availableTimes[0].length - 1];
    let currSchedule = [];
    for (const availability of event.attendeesAvailability) {
      if (availability.name === this.props.username) {
        currSchedule = availability.availability;
        break;
      }
    }
    this.state = {
      schedule: currSchedule,
      startDate,
      numDays,
      hourlyChunks,
      minTime,
      maxTime
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(newSchedule) {
    this.props.updateEvent(this.props.event._id, newSchedule);
    this.setState({
      schedule: newSchedule
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement(ScheduleSelector, {
      selection: this.state.schedule,
      onChange: this.handleChange,
      startDate: this.state.startDate,
      numDays: this.state.numDays,
      hourlyChunks: this.state.hourlyChunks,
      minTime: this.state.minTime,
      maxTime: this.state.maxTime,
      timeFormat: "h:mm A",
      selectionScheme: "square",
      rowGap: "1%",
      columnGap: "1%"
    });
  }
}
export default AvailabilitySchedule;
