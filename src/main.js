import getFilter from "./get-filter";
import {getRandomInteger} from "./utils";
import getTripPoint from "./get-trip-point";
import {getPointsArray} from "./mock/get-points-array";

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const MAX_QTY_POINTS = 20;
const MIN_QTY_POINTS = 1;
const START_QTY_POINTS = 7;

const renderFilters = (filterNamesArray) => {
  const formTripFilter = document.querySelector(`.trip-filter`);
  let fragment = ``;
  filterNamesArray.forEach((filterName) => {
    fragment += getFilter(filterName);
  });
  formTripFilter.innerHTML = fragment;
};

const renderTripPoints = (qtyTripPoints) => {
  const tripDayItems = document.querySelector(`.trip-day__items`);
  const pointsArray = getPointsArray(qtyTripPoints);
  let fragment = ``;
  for (let i = 0; i < qtyTripPoints; i++) {
    fragment += getTripPoint(pointsArray[i]);
  }
  tripDayItems.innerHTML = fragment;
};

const filterClickHandler = (evt) => {
  const isFilterTarget = evt
                         .target
                         .classList
                         .contains(`trip-filter__item`);
  if (isFilterTarget) {
    renderTripPoints(getRandomInteger(MIN_QTY_POINTS, MAX_QTY_POINTS));
  }
};

renderFilters(filterNames);
renderTripPoints(START_QTY_POINTS);

document.body.addEventListener(`click`, filterClickHandler);
