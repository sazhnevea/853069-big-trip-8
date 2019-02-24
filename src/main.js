import makeFilter from './make-filter.js';
import makePoint from './make-point.js';

const filters = document.querySelector(`.trip-filter`);

filters.insertAdjacentHTML(`beforeend`, makeFilter(`everything`, `checked`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`future`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`past`));

const pointsContainer = document.querySelector(`.trip-day__items`);

const renderPoint = (dist) => {
  const points = new Array(7)
    .fill()
    .map(makePoint);
  dist.insertAdjacentHTML(`beforeend`, points.join(``));
};

renderPoint(pointsContainer);
