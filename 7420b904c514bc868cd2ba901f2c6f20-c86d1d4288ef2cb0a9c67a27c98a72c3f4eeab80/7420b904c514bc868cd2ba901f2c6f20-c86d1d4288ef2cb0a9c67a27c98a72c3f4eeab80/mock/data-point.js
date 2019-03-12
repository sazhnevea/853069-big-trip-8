import {
  getRandomValue,
  getRandomInteger,
  getRandomValues,
} from './randomizes';

// https://up.htmlacademy.ru/ecmascript/8/check/tasks/853069/7
const titles = [
  `Taxi to Airport`,
  `Flight to Geneva`,
  `Drive to Chamonix`,
  `Check into a hotel`,
];

const types = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

const offers = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const descriptions = description.split(`. `);

export const getRandomTitle = () => getRandomValue(titles);
export const getRandomType = () => getRandomValue(types);

export const getRandomDescription = (num = 3) =>
  getRandomValues(descriptions, num).join(`. `);

export const getRandomOffers = ({num = 3, price: {min = 10, max = 30}} = {}) =>
  [...new Set(getRandomValues(offers, num))]
    .map((name) => ({name, price: getRandomInteger(min, max)}));

export const getRandomPicture = () =>
  `//picsum.photos/300/150?r=${Math.random()}`;