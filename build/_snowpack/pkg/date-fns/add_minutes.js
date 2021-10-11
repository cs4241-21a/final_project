import { a as add_milliseconds } from '../common/index-b359dd03.js';
import '../common/index-efa3a6db.js';

var MILLISECONDS_IN_MINUTE = 60000;

/**
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @returns {Date} the new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return add_milliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE)
}

var add_minutes = addMinutes;

export default add_minutes;
