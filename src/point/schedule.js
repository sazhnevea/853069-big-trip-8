import moment from 'moment';

const getUnixFormat = (value) => moment(value, `LT`);

const formatTime = (time) => {
  if (typeof time === `string`) {
    time = getUnixFormat(time);
  }
  return moment(time).format(`LT`);
};

const formatDuration = (diff) => {
  return `${moment.duration(diff).hours()}H ${moment.duration(diff).minutes()}M`;
};

export const getTimeClosedPoint = ({start, end}) => {
  if (typeof start === `string`) {
    start = getUnixFormat(start);
  }

  if (typeof end === `string`) {
    end = getUnixFormat(end);
  }
  return `
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}</span>
    <span class="trip-point__duration">${formatDuration(end.diff(start))}</span>
  </p>`;
};

export const getTimeOpenedPoint = ({start, end}) => `
  <div class="point__time">
    <input class="point__input" type="text" value="${formatTime(start)}" name="date-start" placeholder="${formatTime(start)}">
    <input class="point__input" type="text" value="${formatTime(end)}" name="date-end" placeholder="${formatTime(end)}">
  </div>`;
