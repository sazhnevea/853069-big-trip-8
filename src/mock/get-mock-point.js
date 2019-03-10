import {getRandomValue, getFewValues, getRandomInteger} from "../utils";

import {pointsTitles, pointsOptions, descriptionArray} from "./mock-constants";

import {getOffers} from "./get-offers";

import {getMockDate} from "./get-mock-date";

const PriceValue = {
  MIN: 10,
  MAX: 100,
};

export const getMockPoint = function () {
  return {
    title: getRandomValue(pointsTitles),
    type: getRandomValue(pointsOptions),
    offers: new Set(getOffers()),
    description: getFewValues(descriptionArray, 1, 3).join(`. `),
    time: getMockDate(),
    price: getRandomInteger(PriceValue.MIN, PriceValue.MAX)
  };
};
