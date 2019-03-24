import moment from 'moment';

export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomValue = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getRandomValues = (arr, num = 1) =>
  Array.from({length: num}, () => getRandomValue(arr));

export const getTime = () => {
  return {
    start: moment(),
    end: moment().add(getRandomInteger(1, 24), `hours`),
  };
};
