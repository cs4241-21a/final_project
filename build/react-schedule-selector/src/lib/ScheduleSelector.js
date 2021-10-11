import * as React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import addMinutes from "../../../_snowpack/pkg/date-fns/add_minutes.js";
import addHours from "../../../_snowpack/pkg/date-fns/add_hours.js";
import addDays from "../../../_snowpack/pkg/date-fns/add_days.js";
import startOfDay from "../../../_snowpack/pkg/date-fns/start_of_day.js";
import isSameMinute from "../../../_snowpack/pkg/date-fns/is_same_minute.js";
import formatDate from "../../../_snowpack/pkg/date-fns/format.js";
import {Text, Subtitle} from "./typography.js";
import colors from "./colors.js";
import selectionSchemes from "./selection-schemes/index.js";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  user-select: none;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: auto repeat(${(props) => props.rows}, 1fr);
  column-gap: ${(props) => props.columnGap};
  row-gap: ${(props) => props.rowGap};
  width: 100%;
`;
export const GridCell = styled.div`
  place-self: stretch;
  touch-action: none;
`;
const DateCell = styled.div`
  width: 100%;
  height: 25px;
  background-color: ${(props) => props.selected ? props.selectedColor : props.unselectedColor};

  &:hover {
    background-color: ${(props) => props.hoveredColor};
  }
`;
const DateLabel = styled(Subtitle)`
  @media (max-width: 699px) {
    font-size: 12px;
  }
  margin: 0;
  margin-bottom: 4px;
`;
const TimeText = styled(Text)`
  @media (max-width: 699px) {
    font-size: 10px;
  }
  text-align: right;
  margin: 0;
  margin-right: 4px;
`;
export const preventScroll = (e) => {
  e.preventDefault();
};
const _ScheduleSelector = class extends React.Component {
  constructor(props) {
    super(props);
    this.cellToDate = new Map();
    this.gridRef = null;
    this.renderDateCellWrapper = (time) => {
      const startHandler = () => {
        this.handleSelectionStartEvent(time);
      };
      const selected = Boolean(this.state.selectionDraft.find((a) => isSameMinute(a, time)));
      return /* @__PURE__ */ React.createElement(GridCell, {
        className: "rgdp__grid-cell",
        role: "presentation",
        key: time.toISOString(),
        onMouseDown: startHandler,
        onMouseEnter: () => {
          this.handleMouseEnterEvent(time);
        },
        onMouseUp: () => {
          this.handleMouseUpEvent(time);
        },
        onTouchStart: startHandler,
        onTouchMove: this.handleTouchMoveEvent,
        onTouchEnd: this.handleTouchEndEvent
      }, this.renderDateCell(time, selected));
    };
    this.renderDateCell = (time, selected) => {
      const refSetter = (dateCell) => {
        if (dateCell) {
          this.cellToDate.set(dateCell, time);
        }
      };
      if (this.props.renderDateCell) {
        return this.props.renderDateCell(time, selected, refSetter);
      } else {
        return /* @__PURE__ */ React.createElement(DateCell, {
          selected,
          ref: refSetter,
          selectedColor: this.props.selectedColor,
          unselectedColor: this.props.unselectedColor,
          hoveredColor: this.props.hoveredColor
        });
      }
    };
    this.renderTimeLabel = (time) => {
      if (this.props.renderTimeLabel) {
        return this.props.renderTimeLabel(time);
      } else {
        return /* @__PURE__ */ React.createElement(TimeText, null, formatDate(time, this.props.timeFormat));
      }
    };
    this.renderDateLabel = (date) => {
      if (this.props.renderDateLabel) {
        return this.props.renderDateLabel(date);
      } else {
        return /* @__PURE__ */ React.createElement(DateLabel, null, formatDate(date, this.props.dateFormat));
      }
    };
    this.state = {
      selectionDraft: [...this.props.selection],
      selectionType: null,
      selectionStart: null,
      isTouchDragging: false,
      dates: _ScheduleSelector.computeDatesMatrix(props)
    };
    this.selectionSchemeHandlers = {
      linear: selectionSchemes.linear,
      square: selectionSchemes.square
    };
    this.endSelection = this.endSelection.bind(this);
    this.handleMouseUpEvent = this.handleMouseUpEvent.bind(this);
    this.handleMouseEnterEvent = this.handleMouseEnterEvent.bind(this);
    this.handleTouchMoveEvent = this.handleTouchMoveEvent.bind(this);
    this.handleTouchEndEvent = this.handleTouchEndEvent.bind(this);
    this.handleSelectionStartEvent = this.handleSelectionStartEvent.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (state.selectionStart == null) {
      return {
        selectionDraft: [...props.selection],
        dates: _ScheduleSelector.computeDatesMatrix(props)
      };
    }
    return null;
  }
  static computeDatesMatrix(props) {
    const startTime = startOfDay(props.startDate);
    const dates = [];
    const minutesInChunk = Math.floor(60 / props.hourlyChunks);
    for (let d = 0; d < props.numDays; d += 1) {
      const currentDay = [];
      for (let h = props.minTime; h < props.maxTime; h += 1) {
        for (let c = 0; c < props.hourlyChunks; c += 1) {
          currentDay.push(addMinutes(addHours(addDays(startTime, d), h), c * minutesInChunk));
        }
      }
      dates.push(currentDay);
    }
    return dates;
  }
  componentDidMount() {
    document.addEventListener("mouseup", this.endSelection);
    this.cellToDate.forEach((value, dateCell) => {
      if (dateCell && dateCell.addEventListener) {
        dateCell.addEventListener("touchmove", preventScroll, {passive: false});
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.endSelection);
    this.cellToDate.forEach((value, dateCell) => {
      if (dateCell && dateCell.removeEventListener) {
        dateCell.removeEventListener("touchmove", preventScroll);
      }
    });
  }
  getTimeFromTouchEvent(event) {
    const {touches} = event;
    if (!touches || touches.length === 0)
      return null;
    const {clientX, clientY} = touches[0];
    const targetElement = document.elementFromPoint(clientX, clientY);
    if (targetElement) {
      const cellTime = this.cellToDate.get(targetElement);
      return cellTime ?? null;
    }
    return null;
  }
  endSelection() {
    this.props.onChange(this.state.selectionDraft);
    this.setState({
      selectionType: null,
      selectionStart: null
    });
  }
  updateAvailabilityDraft(selectionEnd, callback) {
    const {selectionType, selectionStart} = this.state;
    if (selectionType === null || selectionStart === null)
      return;
    let newSelection = [];
    if (selectionStart && selectionEnd && selectionType) {
      newSelection = this.selectionSchemeHandlers[this.props.selectionScheme](selectionStart, selectionEnd, this.state.dates);
    }
    let nextDraft = [...this.props.selection];
    if (selectionType === "add") {
      nextDraft = Array.from(new Set([...nextDraft, ...newSelection]));
    } else if (selectionType === "remove") {
      nextDraft = nextDraft.filter((a) => !newSelection.find((b) => isSameMinute(a, b)));
    }
    this.setState({selectionDraft: nextDraft}, callback);
  }
  handleSelectionStartEvent(startTime) {
    const timeSelected = this.props.selection.find((a) => isSameMinute(a, startTime));
    this.setState({
      selectionType: timeSelected ? "remove" : "add",
      selectionStart: startTime
    });
  }
  handleMouseEnterEvent(time) {
    this.updateAvailabilityDraft(time);
  }
  handleMouseUpEvent(time) {
    this.updateAvailabilityDraft(time);
  }
  handleTouchMoveEvent(event) {
    this.setState({isTouchDragging: true});
    const cellTime = this.getTimeFromTouchEvent(event);
    if (cellTime) {
      this.updateAvailabilityDraft(cellTime);
    }
  }
  handleTouchEndEvent() {
    if (!this.state.isTouchDragging) {
      this.updateAvailabilityDraft(null, () => {
        this.endSelection();
      });
    } else {
      this.endSelection();
    }
    this.setState({isTouchDragging: false});
  }
  renderFullDateGrid() {
    const flattenedDates = [];
    const numDays = this.state.dates.length;
    const numTimes = this.state.dates[0].length;
    for (let j = 0; j < numTimes; j += 1) {
      for (let i = 0; i < numDays; i += 1) {
        flattenedDates.push(this.state.dates[i][j]);
      }
    }
    const dateGridElements = flattenedDates.map(this.renderDateCellWrapper);
    for (let i = 0; i < numTimes; i += 1) {
      const index = i * numDays;
      const time = this.state.dates[0][i];
      dateGridElements.splice(index + i, 0, this.renderTimeLabel(time));
    }
    return [
      /* @__PURE__ */ React.createElement("div", {
        key: "topleft"
      }),
      ...this.state.dates.map((dayOfTimes, index) => React.cloneElement(this.renderDateLabel(dayOfTimes[0]), {key: `date-${index}`})),
      ...dateGridElements.map((element, index) => React.cloneElement(element, {key: `time-${index}`}))
    ];
  }
  render() {
    return /* @__PURE__ */ React.createElement(Wrapper, null, /* @__PURE__ */ React.createElement(Grid, {
      columns: this.state.dates.length,
      rows: this.state.dates[0].length,
      columnGap: this.props.columnGap,
      rowGap: this.props.rowGap,
      ref: (el) => {
        this.gridRef = el;
      }
    }, this.renderFullDateGrid()));
  }
};
let ScheduleSelector = _ScheduleSelector;
ScheduleSelector.defaultProps = {
  selection: [],
  selectionScheme: "square",
  numDays: 7,
  minTime: 9,
  maxTime: 23,
  hourlyChunks: 1,
  startDate: new Date(),
  timeFormat: "ha",
  dateFormat: "M/D",
  columnGap: "4px",
  rowGap: "4px",
  selectedColor: colors.blue,
  unselectedColor: colors.paleBlue,
  hoveredColor: colors.lightBlue,
  onChange: () => {
  }
};
export default ScheduleSelector;
