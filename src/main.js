// закомментировал потому что убрал
// вызов этой функции и линтер ругается
// import getFilter from "./get-filter";

import {getPointsFragment} from "./get-points-fragment";

// закомментировал потому что убрал
// вызов этого массива и линтер ругается
// const filterNames = [
//   `everything`,
//   `future`,
//   `past`,
// ];

const tripFilterForm = document.querySelector(`.trip-filter`);
const tripDayItems = document.querySelector(`.trip-day__items`);

// закомментировал потому что убрал
// вызов этой функции и линтер ругается
// const renderFilters = (names) => {
//   let fragment = ``;
//   names.forEach((name) => {
//     fragment += getFilter(name);
//   });
//   tripFilterForm.innerHTML = fragment;
// };

const renderTripPoints = (fragment) => {
  tripDayItems.innerHTML = fragment;
};

// добавил это чтобы видеть что получается в итоге

renderTripPoints(getPointsFragment());

const filterClickHandler = () => {
  renderTripPoints(getPointsFragment());
};

tripFilterForm.addEventListener(`click`, () => filterClickHandler());

// дата
