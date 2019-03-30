import moment from 'moment';
import {getRandomInteger} from './randomizes';
import {
  getRandomDescription,
  getRandomOffers,
  getRandomPicture,
  getRandomTitle,
  getRandomType,
  getRandomDestination,
} from './data-point';

const getTime = function () {
  return {
    start: moment(),
    end: moment().add(getRandomInteger(1, 86400000), `milliseconds`),
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
  destination: getRandomDestination(),
});
