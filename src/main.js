import {getPointsFragment} from "./get-points-fragment";

const tripFilterForm = document.querySelector(`.trip-filter`);
const tripDayItems = document.querySelector(`.trip-day__items`);

const renderTripPoints = (fragment) => {
  tripDayItems.innerHTML = fragment;
};

renderTripPoints(getPointsFragment());

const filterClickHandler = () => {
  renderTripPoints(getPointsFragment());
};

tripFilterForm.addEventListener(`click`, () => filterClickHandler());
