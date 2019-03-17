import Point from './point.js';
import PointFull from './point-full.js';
import {getFilter} from './filter';
import {getPointData} from './mock/data';

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const filterContainer = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);

const generateFilters = () => filterNames.map(getFilter).join(``);

const generatePoints = (count = 7) => {
  return [...Array(count)].map(() => new Point(getPointData()));
};

const renderFilters = (element) => {
  filterContainer.innerHTML = element;
};

const fullPointComponent = new PointFull(getPointData());

const renderPoints = (components) => {
  components.forEach((pointComponent) => {
    pointsContainer.appendChild(pointComponent.render());

    pointComponent.onEdit = () => {
      fullPointComponent.render();
      pointsContainer.replaceChild(fullPointComponent.element, pointComponent.element);
      pointComponent.unrender();
    };

    fullPointComponent.onSubmit = () => {
      pointComponent.render();
      pointsContainer.replaceChild(pointComponent.element, fullPointComponent.element);
      fullPointComponent.unrender();
    };
  });
};

filterContainer.addEventListener(`change`, () => {
  pointsContainer.innerHTML = ``;
  renderPoints(generatePoints());
});

renderFilters(generateFilters());
renderPoints(generatePoints());
