import {addLeadingZero} from "./utils";

export default (time) => `
 <p class="trip-point__schedule">
    <span class="trip-point__timetable">${ addLeadingZero(time.start.getHours())}:${addLeadingZero(time.start.getMinutes())}&nbsp;&mdash;${addLeadingZero(time.end.getHours())}:${addLeadingZero(time.end.getMinutes())}</span>
    <span class="trip-point__duration">${time.interval.hours}h ${time.interval.minutes}m</span>
  </p>`;
