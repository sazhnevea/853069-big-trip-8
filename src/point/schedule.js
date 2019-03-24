import moment from 'moment';

const formatTime = (date) => date.format(`HH:MM`);

export const getTimeClosedPoint = ({start, end}) => `
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}</span>
    <span class="trip-point__duration">${formatTime(moment(end.diff(start)))}</span>
  </p>`;

export const getTimeOpenedPoint = ({start, end}) => `
    <label class="point__time">
      ${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}
      <input class="point__input"
        type="text"
        value="${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}"
        name="time"
        placeholder="${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}">
    </label>`;

