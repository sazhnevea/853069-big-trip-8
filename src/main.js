import makeFilter from './make-filter.js';
import makePoint from './make-point.js';

const filters = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);

filters.insertAdjacentHTML(`beforeend`, makeFilter(`everything`, `checked`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`future`));
filters.insertAdjacentHTML(`beforeend`, makeFilter(`past`));

const renderPoints = (dist, count = 7) => {
  const points = new Array(count)
    .fill()
    .map(makePoint);
  dist.insertAdjacentHTML(`beforeend`, points.join(``));
};

renderPoints(pointsContainer);

const getRandomNumber = (min = 1, max = 100) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

filters.addEventListener(`click`, (evt) => {
  const isFilterTarget = evt
                         .target
                         .classList
                         .contains(`trip-filter__item`);
  if (isFilterTarget) {
    pointsContainer.innerHTML = ``;
    renderPoints(pointsContainer, getRandomNumber(1, 20));
  }
});
