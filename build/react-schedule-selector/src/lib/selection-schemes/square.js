import isBefore from "../../../../_snowpack/pkg/date-fns/is_before.js";
import startOfDay from "../../../../_snowpack/pkg/date-fns/start_of_day.js";
import * as dateUtils from "../date-utils.js";
const square = (selectionStart, selectionEnd, dateList) => {
  let selected = [];
  if (selectionEnd == null) {
    if (selectionStart)
      selected = [selectionStart];
  } else if (selectionStart) {
    const dateIsReversed = isBefore(startOfDay(selectionEnd), startOfDay(selectionStart));
    const timeIsReversed = selectionStart.getHours() > selectionEnd.getHours();
    selected = dateList.reduce((acc, dayOfTimes) => acc.concat(dayOfTimes.filter((t) => selectionStart && selectionEnd && dateUtils.dateIsBetween(dateIsReversed ? selectionEnd : selectionStart, t, dateIsReversed ? selectionStart : selectionEnd) && dateUtils.timeIsBetween(timeIsReversed ? selectionEnd : selectionStart, t, timeIsReversed ? selectionStart : selectionEnd))), []);
  }
  return selected;
};
export default square;
