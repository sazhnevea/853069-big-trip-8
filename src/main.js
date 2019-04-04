import Point from './point.js';
import PointFull from './point-full.js';
import Filter from './filter.js';
import {getPointData} from './mock/data';
import {filterNames} from './mock/filter-names';

const filterContainer = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);


const generatePointsData = (count = 7) => {
  return [...Array(count)].map(() => getPointData());
};

const getFilteredPoints = (points, filter) => {
  switch (filter) {
    case `everything`:
      return points;

    case `future`:
      return points.filter((point) => point.time.start > Date.now());

    case `past`:
      return points.filter((point) => point.time.start < Date.now());
  }
};

const renderFilters = (names) => {
  names.forEach((name) => {
    const filterComponent = new Filter(name);
    filterContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      filterComponent.checked = !filterComponent.checked;
    };
  });
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

    fullPointComponent.onSubmit = (newData) => {
      pointComponent.update(newData);
      pointComponent.render();
      pointsContainer.replaceChild(pointComponent.element, fullPointComponent.element);
      fullPointComponent.unrender();
    };

    fullPointComponent.onDelete = () => {
      pointComponent.markAsDeleted();
      fullPointComponent.unrender();
    };
  });
};

const pointsData = generatePointsData();

filterContainer.addEventListener(`change`, ({target}) => {
  const filteredPoints = getFilteredPoints(pointsData, target.value);
  pointsContainer.innerHTML = ``;
  renderPoints(filteredPoints);

});

renderFilters(filterNames);
renderPoints(pointsData);
