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

const generatePointsData = (count = 7) => {
  return [...Array(count)].map(() => getPointData());
};

const renderFilters = (element) => {
  filterContainer.innerHTML = element;
};

const renderPoints = (pointsData) => {
  pointsData.forEach((pointData) => {
    const pointComponent = new Point(pointData);
    const fullPointComponent = new PointFull(pointData);
    pointsContainer.appendChild(pointComponent.render());

    pointComponent.onEdit = () => {
      fullPointComponent.render();
      pointsContainer.replaceChild(fullPointComponent.element, pointComponent.element);
      pointComponent.unrender();

    };

    fullPointComponent.onSubmit = (newObject) => {

      pointComponent.update(newObject);

      pointComponent.render();
      pointsContainer.replaceChild(pointComponent.element, fullPointComponent.element);
      fullPointComponent.unrender();
    };
  });
};

filterContainer.addEventListener(`change`, () => {
  pointsContainer.innerHTML = ``;
  renderPoints(generatePointsData());
});

renderFilters(generateFilters());
renderPoints(generatePointsData());
