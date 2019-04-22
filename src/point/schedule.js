import moment from 'moment';

const getDuration = (from, to) => {
  const durarion = moment.duration(moment(to).diff(moment(from)));
  return `${durarion.hours()}H ${durarion.minutes()}M`;
};

const formatTime = (time) => {
  return moment(time).format(`LT`);
};

export const getTimeClosedPoint = ({start, end}) => {
  return `
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}</span>
    <span class="trip-point__duration">${getDuration(start, end)}</span>
  </p>`;
};

export const getTimeOpenedPoint = ({start, end}) => `
  <div class="point__time">
    <input class="point__input" type="text" value="${formatTime(start)}" name="date-start" placeholder="${formatTime(start)}">
    <input class="point__input" type="text" value="${formatTime(end)}" name="date-end" placeholder="${formatTime(end)}">
  </div>`;
