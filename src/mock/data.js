import {getTime, getRandomInteger} from './randomizes';
import {
  getRandomDescription,
  getRandomOffers,
  getRandomPicture,
  getRandomTitle,
  getRandomType,
} from './data-point';

export const getPointData = () => ({
  title: getRandomTitle(),
  type: getRandomType(),
  picture: getRandomPicture(),
  description: getRandomDescription(3),
  price: getRandomInteger(10, 100),
  time: getTime(),
  offers: getRandomOffers({
    num: 3,
    price: {min: 10, max: 100},
  }),
});
