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

const getDate = function () {
  return {
    start: moment().valueOf(),
    end: moment().add(getRandomInteger(2, 24), `hours`).valueOf(),
  };
};


export const getPointData = () => ({
  title: getRandomTitle(),
  type: getRandomType(),
  picture: getRandomPicture(),
  description: getRandomDescription(3),
  price: getRandomInteger(10, 100),
  time: getDate(),
  offers: getRandomOffers({
    num: 3,
    price: {min: 10, max: 100},
  }),
  destination: getRandomDestination(),
});
