import {getPoint} from './point';
import {getFilter} from './filter';

import {getPointData} from './mock/data';

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const generateFilters = () => filterNames.map(getFilter).join(``);
const generatePoints = (num = 3) => [...Array(num)]
  .map(getPointData)
  .map(getPoint)
  .join(``);

const filterForm = document.querySelector(`.trip-filter`);
const dayItems = document.querySelector(`.trip-day__items`);

const renderElements = (container, element) => {
  container.innerHTML = element;
};

filterForm.addEventListener(`change`, () => {
  renderElements(dayItems, generatePoints());
});

renderElements(dayItems, generatePoints());
renderElements(filterForm, generateFilters());