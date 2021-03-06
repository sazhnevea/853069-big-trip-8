import Point from './point.js';
import PointFull from './point-full.js';
import TotalCost from './total-cost.js';

// import Stats from './statistics.js';
import Filter from './filter.js';
import {API} from './api.js';

const filterNames = [
  `everything`,
  `future`,
  `past`,
];

const api = new API({endPoint: `https://es8-demo-srv.appspot.com/big-trip`, authorization: `Basic eo0w489io264444`});

const filterContainer = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);
const costContainer = document.querySelector(`.trip`);

// const getFilteredPoints = (points, filter) => {
//   switch (filter) {
//     case `everything`: return points;
//     case `future`: return points.filter((point) => point.time.start > Date.now());
//     case `past`: return points.filter((point) => point.time.start < Date.now());
//   }
//   return ``;
// };

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
  const costComponent = new TotalCost(pointsData);
  costContainer.appendChild(costComponent.render());

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
      fullPointComponent.removeWarning();
      fullPointComponent.lockButtons();
      fullPointComponent.savingButtonMode();
      pointData.destination = newData.destination;
      pointData.price = newData.price;
      pointData.time = newData.time;
      pointData.offers = newData.offers;

      api.updatePoint({id: pointData.id, data: pointData.toRAW()})
        .then((newPoint) => {
          pointComponent.update(newPoint);
          pointComponent.render();
          pointsContainer.replaceChild(pointComponent.element, fullPointComponent.element);
          fullPointComponent.unrender();
          api.getPoints()
            .then((points) => {
              costComponent.unrender();
              costComponent.update(points);
              costContainer.appendChild(costComponent.render());
            });
        })
        .catch((err) => {
          fullPointComponent.getWarning();
          fullPointComponent.unlockButtons();
          fullPointComponent.saveButtonMode();
          throw err;
        });
    };

    fullPointComponent.onDelete = ({id}) => {
      fullPointComponent.removeWarning();
      fullPointComponent.lockButtons();
      fullPointComponent.deletingButtonMode();
      api.deletePoint({id})
        .then(() => api.getPoints())
        .then((points) => {
          fullPointComponent.unrender();
          costComponent.unrender();
          costComponent.update(points);
          costContainer.appendChild(costComponent.render());
        })
        .catch((err) => {
          fullPointComponent.getWarning();
          fullPointComponent.unlockButtons();
          fullPointComponent.deleteButtonMode();
          throw err;
        });
    };
  });
};

// filterContainer.addEventListener(`change`, ({target}) => {
//   const filteredPoints = getFilteredPoints(pointsData, target.value);
//   pointsContainer.innerHTML = ``;
//   renderPoints(filteredPoints);
// });

renderFilters(filterNames);

api.getPoints()
  .then((points) => {
    renderPoints(points);
  });

// const mainContainer = document.getElementById(`table`);
// const statsContainer = document.getElementById(`stats`);
// const tableButton = document.querySelector(`.view-switch a:nth-child(1)`);
// const statsButton = document.querySelector(`.view-switch a:nth-child(2)`);

// statsButton.addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   mainContainer.classList.add(`visually-hidden`);
//   statsContainer.classList.remove(`visually-hidden`);
// });

// tableButton.addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   mainContainer.classList.remove(`visually-hidden`);
//   statsContainer.classList.add(`visually-hidden`);
// });

// const moneyCtx = document.querySelector(`.statistic__money`);
// const transportCtx = document.querySelector(`.statistic__transport`);
// const timeSpentCtx = document.querySelector(`.statistic__time-spend`);

// const money = new Stats(moneyCtx, pointsData, `money`);
// money.render();

// const transport = new Stats(transportCtx, pointsData, `transport`);
// transport.render();

// const timeSpent = new Stats(timeSpentCtx, pointsData, `time spent`);
// timeSpent.render();
