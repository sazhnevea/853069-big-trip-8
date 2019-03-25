import moment from 'moment';
import {getRandomInteger} from './randomizes';
import {
  getRandomDescription,
  getRandomOffers,
  getRandomPicture,
  getRandomTitle,
  getRandomType,
} from './data-point';

const getTime = () => {
  return {
    start: moment(),
    end: moment().add(getRandomInteger(1, 24), `hours`),
  };
};


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
