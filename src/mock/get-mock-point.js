import {getRandomIndex, getRandomValue, getRandomInteger} from "../utils";
import {pointsTitles, pointsOptions, description} from "./mock-constants";
import {getOffers} from "./get-offers";
import {getMockDate} from "./get-mock-date";

const PriceValue = {
  MIN: 10,
  MAX: 100,
};

const descLines = description.split(`. `);

const getRandomValues = (arr, n = 3) =>
  Array.from({length: n}, () => getRandomIndex(arr)).join(`. `).trim();

export const getMockPoint = function () {
  return {
    title: getRandomValue(pointsTitles),
    type: getRandomValue(pointsOptions),
    offers: new Set(getOffers()),
    description: getRandomValues(descLines, 3),
    time: getMockDate(),
    price: getRandomInteger(PriceValue.MIN, PriceValue.MAX)
  };
};
