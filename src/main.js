import getFilter from "./get-filter";
import {getPointsFragment} from "./get-points-fragment";

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const tripFilterForm = document.querySelector(`.trip-filter`);
const tripDayItems = document.querySelector(`.trip-day__items`);

const renderFilters = (filterNamesArray) => {
  let fragment = ``;
  filterNamesArray.forEach((filterName) => {
    fragment += getFilter(filterName);
  });
  tripFilterForm.innerHTML = fragment;
};

const renderTripPoints = (fragment) => {
  tripDayItems.innerHTML = fragment;
};

// const tripFilterForm = document.querySelector(`.trip-filter`);

// tripFilterForm.addEventListener(`change`, filterClickHandler);

const filterClickHandler = (evt) => {
  const isFilterTarget = evt
                         .target
                         .classList
                         .contains(`trip-filter__item`);
  if (isFilterTarget) {
    renderTripPoints(getPointsFragment());
  }
};

tripFilterForm.addEventListener(`click`, renderFilters(filterNames));
tripDayItems.addEventListener(`click`, renderTripPoints(getPointsFragment()));

tripFilterForm.addEventListener(`change`, filterClickHandler);
