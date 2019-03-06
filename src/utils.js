// случайное целое число
export const getRandomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));


// Случайный индекс массива
export const getRandomIndex = (array) =>
  getRandomInteger(0, array.length - 1);

// Случайное значение из массива
export const getRandomValue = (array) =>
  array[getRandomIndex(array)];

export const getFewValues = (array, minNumberValues, maxNumberValues) => {
  const localArray = array.slice();
  const numberValues = getRandomInteger(minNumberValues, maxNumberValues);

  return new Array(numberValues)
    .fill(``)
    .map(() => {
      const randomIndex = getRandomIndex(localArray);
      return localArray.splice(randomIndex, 1);
    });
};

export const addLeadingZero = (number) => {
  if (number < 10) {
    return `0` + number;
  } else {
    return `` + number;
  }
};
