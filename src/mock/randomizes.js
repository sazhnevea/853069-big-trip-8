export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomValue = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getRandomValues = (arr, num = 1) =>
  Array.from({length: num}, () => getRandomValue(arr));

export const getRandomDates = ({
  start = new Date(),
  hours = 2,
  minutes = 20,
} = {}) => {
  const end = new Date();
  end.setHours(start.getHours() + hours, start.getMinutes() + minutes);

  return {start, end};
};
