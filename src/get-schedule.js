export default (time) => `
 <p class="trip-point__schedule">
    <span class="trip-point__timetable">${time.start.toTimeString().slice(0, 5)}&nbsp;&mdash;${time.end.toTimeString().slice(0, 5)}</span>
    <span class="trip-point__duration">${time.start.toTimeString().slice(0, 2)}h ${time.start.toTimeString().slice(3, 5)}m</span>
  </p>`;
