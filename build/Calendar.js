import React from "./_snowpack/pkg/react.js";
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
function getFirstDayOfMonth(month, year) {
  let firstDay = new Date(year, month, 1);
  if (typeof daysInWeek[firstDay.getDay()] != "undefined") {
    return daysInWeek[firstDay.getDay()];
  } else {
    return "error";
  }
}
function getNumDaysInMonth(month) {
  return new Date(2020, month + 1, 0).getDate();
}
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }
  previousMonth() {
    let newMonth = this.state.month - 1;
    let newYear = this.state.year;
    if (this.state.month === 0) {
      newMonth = 11;
      newYear--;
    }
    this.setState({
      month: newMonth,
      year: newYear
    });
  }
  nextMonth() {
    let newMonth = this.state.month + 1;
    let newYear = this.state.year;
    if (this.state.month === 11) {
      newMonth = 0;
      newYear++;
    }
    this.setState({
      month: newMonth,
      year: newYear
    });
  }
  render() {
    let numWeeks = 5;
    let firstDayOfMonth = daysMap[getFirstDayOfMonth(this.state.month, this.state.year)];
    let weeks = [];
    let dayNames = [];
    let numDaysLastMonth = getNumDaysInMonth(this.state.month - 1);
    let firstDayOfWeek = numDaysLastMonth - firstDayOfMonth;
    for (let i = 0; i < numWeeks; i++) {
      if (i === 0) {
        weeks.push(/* @__PURE__ */ React.createElement(CalendarWeek, {
          month: this.state.month,
          year: this.state.year,
          firstDay: firstDayOfWeek,
          firstWeek: "true"
        }));
      } else {
        firstDayOfWeek = 7 * i - firstDayOfMonth;
        weeks.push(/* @__PURE__ */ React.createElement(CalendarWeek, {
          month: this.state.month,
          year: this.state.year,
          firstDay: firstDayOfWeek,
          firstWeek: "false"
        }));
      }
    }
    for (let i = 0; i < daysInWeek.length; i++) {
      dayNames.push(/* @__PURE__ */ React.createElement(DayName, {
        dayName: daysInWeek[i]
      }));
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "calendar"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "calendar-monthbar"
    }, /* @__PURE__ */ React.createElement("button", {
      className: "calendar-monthbar-previous",
      onClick: this.previousMonth
    }, "Back"), /* @__PURE__ */ React.createElement("p", {
      id: "calendar-month"
    }, /* @__PURE__ */ React.createElement("b", null, monthNames[this.state.month] + ", " + this.state.year)), /* @__PURE__ */ React.createElement("button", {
      className: "calendar-monthbar-next",
      onClick: this.nextMonth
    }, "Forward")), /* @__PURE__ */ React.createElement("div", {
      className: "calendar-day-container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "calendar-day-names"
    }, dayNames), /* @__PURE__ */ React.createElement("div", {
      className: "calendar-days"
    }, weeks)));
  }
}
function CalendarWeek(props) {
  let days = [];
  let numDaysLastMonth = getNumDaysInMonth(props.month - 1);
  let numDaysThisMonth = getNumDaysInMonth(props.month);
  let firstDayOfWeek = props.firstDay;
  if (firstDayOfWeek === numDaysLastMonth) {
    firstDayOfWeek = 0;
  }
  for (let i = 0; i < 7; i++) {
    days.push(/* @__PURE__ */ React.createElement(CalendarDay, {
      day: ++firstDayOfWeek
    }));
    if (firstDayOfWeek === numDaysLastMonth && props.firstWeek === "true")
      firstDayOfWeek = 0;
    if (firstDayOfWeek === numDaysThisMonth && props.firstWeek === "false")
      firstDayOfWeek = 0;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "calendar-days-week"
  }, days);
}
function CalendarDay(props) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "calendar-days-day"
  }, /* @__PURE__ */ React.createElement("p", null, props.day), /* @__PURE__ */ React.createElement("div", {
    className: "event-dialogue"
  }, /* @__PURE__ */ React.createElement(EventDialogue, null)));
}
function DayName(props) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "calendar-day-name"
  }, /* @__PURE__ */ React.createElement("p", null, props.dayName));
}
function EventDialogue() {
  return /* @__PURE__ */ React.createElement(Popup, {
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
  }, "Create Event")))));
}
export default Calendar;
