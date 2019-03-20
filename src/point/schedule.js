const Time = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
};

const makeTime = (ms) => ({
  D: Math.floor(ms / Time.DAY),
  H: Math.floor(ms / Time.HOUR) % 24,
  M: Math.floor(ms / Time.MINUTE) % 60,
});

const formatTime = (date) => date.toTimeString().slice(0, 5);

const getDuration = (dateStart, dateEnd) => dateEnd - dateStart;

const hasTimeValue = ([, value]) => value !== 0;
const formatTimeValue = ([format, value]) => `${value}${format}`;

const formatDuration = (ms) =>
  Object.entries(makeTime(ms))
    .filter(hasTimeValue)
    .map(formatTimeValue)
    .join(` `);

export const getSchedule = ({start, end}) => `
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${formatTime(start)}&nbsp;&mdash; ${formatTime(end)}</span>
    <span class="trip-point__duration">${formatDuration(getDuration(start, end))}</span>
  </p>`;
