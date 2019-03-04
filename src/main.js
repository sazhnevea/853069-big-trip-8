import makeFilter from './make-filter.js';
import makePoint from './make-point.js';

const filters = document.querySelector(`.trip-filter`);
const pointsContainer = document.querySelector(`.trip-day__items`);

filters.insertAdjacentHTML(`beforeend`, makeFilter());

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




// отработка
var stringArray = ['Голубая', 'Горбатая', 'Белуга'];
var numericStringArray = ['80', '9', '700'];
var numberArray = [40, 1, 5, 200];
var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

function compareNumbers(a, b) {
  return a - b;
}

// снова предполагаем, что функция печати определена
console.log('stringArray:', stringArray.join());
console.log('Сортировка:', stringArray.sort());

console.log('numberArray:', numberArray.join());
console.log('Сортировка без функции сравнения:', numberArray.sort());
console.log('Сортировка с функцией compareNumbers:', numberArray.sort(compareNumbers));

console.log('numericStringArray:', numericStringArray.join());
console.log('Сортировка без функции сравнения:', numericStringArray.sort());
console.log('Сортировка с функцией compareNumbers:', numericStringArray.sort(compareNumbers));

console.log('mixedNumericArray:', mixedNumericArray.join());
console.log('Сортировка без функции сравнения:', mixedNumericArray.sort());
console.log('Сортировка с функцией compareNumbers:', mixedNumericArray.sort(compareNumbers));