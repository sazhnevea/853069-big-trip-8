import Point from './point.js';
import PointFull from './point-full.js';
import Stats from './statistics.js';
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
  return ``;
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

const mainContainer = document.getElementById(`table`);
const statsContainer = document.getElementById(`stats`);
const tableButton = document.querySelector(`.view-switch a:nth-child(1)`);
const statsButton = document.querySelector(`.view-switch a:nth-child(2)`);

statsButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mainContainer.classList.add(`visually-hidden`);
  statsContainer.classList.remove(`visually-hidden`);
});

tableButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mainContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);
});

// const moneyCtx = document.querySelector(`.statistic__money`);
const transportCtx = document.querySelector(`.statistic__transport`);
// const timeSpentCtx = document.querySelector(`.statistic__time-spend`);

// const money = new Stats(moneyCtx, pointsData, `money`);
// money.render();

const transport = new Stats(transportCtx, pointsData, `transport`);
transport.render();

// const timeSpent = new Stats(timeSpentCtx, pointsData, `time spent`);
// timeSpent.render();
