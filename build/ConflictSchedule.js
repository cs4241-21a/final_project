import React from "./_snowpack/pkg/react.js";
class ConflictSchedule extends React.Component {
  constructor(props) {
    super(props);
    let event = this.props.event;
    event.availableDates = event.availableDates.map((availableDate) => new Date(availableDate));
    let attendeesAvailability = event.attendeesAvailability;
    let availabilityMap = {};
    let maxAvail = 0;
    for (const attendeeAvailBlob of attendeesAvailability) {
      for (const availability of attendeeAvailBlob.availability) {
        const availabilityDate = new Date(availability);
        const availableDate = new Date(availabilityDate.getFullYear(), availabilityDate.getMonth(), availabilityDate.getDate()).toISOString();
        const availableTime = (availabilityDate.getHours() + availabilityDate.getMinutes() / 60).toString();
        if (!availabilityMap.hasOwnProperty(availableDate)) {
          availabilityMap[availableDate] = {};
          availabilityMap[availableDate][availableTime] = 1;
        } else if (!availabilityMap[availableDate].hasOwnProperty(availableTime)) {
          availabilityMap[availableDate][availableTime] = 1;
        } else {
          availabilityMap[availableDate][availableTime] += 1;
        }
        const currAvail = availabilityMap[availableDate][availableTime];
        if (currAvail > maxAvail) {
          maxAvail = currAvail;
        }
      }
    }
    let minTime = event.availableTimes[0][0];
    let maxTime = event.availableTimes[0][event.availableTimes[0].length - 1];
    let mouseClickedArr = [];
    if (event.chosenEventDate !== null) {
      const availabilityDate = new Date(event.chosenEventDate);
      const availableDate = new Date(availabilityDate.getFullYear(), availabilityDate.getMonth(), availabilityDate.getDate()).toISOString();
      const availableTime = event.chosenStartTime.toString();
      mouseClickedArr.push(availableDate);
      mouseClickedArr.push(availableTime);
    }
    this.state = {
      totalAvailable: event.attendeesAvailability.length,
      maxAvail,
      availabilityMap,
      minTime,
      maxTime,
      hourlyChunks: 1 / event.meetingDuration,
      totalHours: maxTime - minTime,
      mouseClickedArr
    };
    this.calculateColor = this.calculateColor.bind(this);
    this.initTile = this.initTile.bind(this);
  }
  calculateColor(availableDateStr, availableTimeStr) {
    let availableCount = 0;
    if (this.state.availabilityMap[availableDateStr] != void 0 && this.state.availabilityMap[availableDateStr][availableTimeStr] != void 0) {
      availableCount = this.state.availabilityMap[availableDateStr][availableTimeStr];
    }
    if (this.state.mouseClickedArr[0] === availableDateStr && this.state.mouseClickedArr[1] === availableTimeStr) {
      return {
        backgroundColor: `rgb(255, 100, 100)`
      };
    } else {
      return {
        backgroundColor: `rgba(0, 150, 220, ${availableCount / this.state.totalAvailable})`
      };
    }
  }
  initTile(target, availableDateStr, availableTimeStr) {
    if (this.state.mouseClickedArr[0] === availableDateStr && this.state.mouseClickedArr[1] === availableTimeStr && this.state.mouseClickedArr[2] == void 0) {
      this.setState({
        totalAvailable: this.state.totalAvailable,
        availabilityMap: this.state.availabilityMap,
        minTime: this.state.minTime,
        maxTime: this.state.maxTime,
        hourlyChunks: this.state.hourlyChunks,
        totalHours: this.state.totalHours,
        mouseClickedArr: [availableDateStr, availableTimeStr, target]
      });
    }
  }
  onMouseClicked(target, availableDateStr, availableTimeStr) {
    if (this.state.availabilityMap[availableDateStr] == void 0 || this.state.availabilityMap[availableDateStr][availableTimeStr] === void 0) {
      return;
    }
    if (this.state.maxAvail > this.state.availabilityMap[availableDateStr][availableTimeStr]) {
      return;
    }
    if (this.state.mouseClickedArr.length >= 2) {
      this.state.mouseClickedArr[2].style.backgroundColor = this.calculateColor(this.state.mouseClickedArr[0], this.state.mouseClickedArr[1]).backgroundColor;
    }
    this.setState({
      totalAvailable: this.state.totalAvailable,
      availabilityMap: this.state.availabilityMap,
      minTime: this.state.minTime,
      maxTime: this.state.maxTime,
      hourlyChunks: this.state.hourlyChunks,
      totalHours: this.state.totalHours,
      mouseClickedArr: [availableDateStr, availableTimeStr, target]
    });
    target.style.backgroundColor = this.calculateColor(availableDateStr, availableTimeStr).backgroundColor;
    this.props.selectDate(this.props.event._id, availableDateStr, availableTimeStr);
  }
  render() {
    return /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, " "), this.props.event.availableDates.map((availableDate) => /* @__PURE__ */ React.createElement("th", null, availableDate.getMonth() + 1, "/", availableDate.getDate())))), /* @__PURE__ */ React.createElement("tbody", null, this.props.event.availableTimes[0].map((availableTime) => /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, Math.floor(availableTime), ":", availableTime * 10 % 10 == 5 ? "30" : "00", availableTime >= 12 ? "PM" : "AM"), this.props.event.availableDates.map((availableDate) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", {
      style: this.calculateColor(availableDate.toISOString(), availableTime.toString()),
      ref: (target) => this.initTile(target, availableDate.toISOString(), availableTime.toString()),
      onMouseDown: (e) => this.onMouseClicked(e.target, availableDate.toISOString(), availableTime.toString())
    }, " ")))))));
  }
}
export default ConflictSchedule;
