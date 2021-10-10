import startOfDay from "../../../_snowpack/pkg/date-fns/start_of_day.js";
import isAfter from "../../../_snowpack/pkg/date-fns/is_after.js";
export const dateHourIsBetween = (start, candidate, end) => (candidate.getTime() === start.getTime() || isAfter(candidate, start)) && (candidate.getTime() === end.getTime() || isAfter(end, candidate));
export const dateIsBetween = (start, candidate, end) => {
  const startOfCandidate = startOfDay(candidate);
  const startOfStart = startOfDay(start);
  const startOfEnd = startOfDay(end);
  return (startOfCandidate.getTime() === startOfStart.getTime() || isAfter(startOfCandidate, startOfStart)) && (startOfCandidate.getTime() === startOfEnd.getTime() || isAfter(startOfEnd, startOfCandidate));
};
export const timeIsBetween = (start, candidate, end) => {
  const candidateTime = candidate.getHours() * 60 + candidate.getMinutes();
  const startTime = start.getHours() * 60 + start.getMinutes();
  const endTime = end.getHours() * 60 + end.getMinutes();
  return candidateTime >= startTime && candidateTime <= endTime;
};
