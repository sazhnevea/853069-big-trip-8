// случайное целое число
export const getRandomInteger = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

// Случайный индекс массива
export const getRandomIndex = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

// Случайное значение из массива
export const getRandomValue = (arr, n = 1) =>
  Array.from({length: n}, () => getRandomIndex(arr));

export const getFewValues = (arr, minNumberValues, maxNumberValues) => {
  const localArr = arr.slice();
  // ([...arr]) копия
  // arr сокращать до arr
  const numberValues = getRandomInteger(minNumberValues, maxNumberValues);

  return new Array(numberValues)
    .fill(``)
    .map(() => {
      const randomIndex = getRandomIndex(localArr);
      return localArr.splice(randomIndex, 1);
    });
};

// удалить
export const addLeadingZero = (number) => {
  if (number < 10) {
    return `0` + number;
  } else {
    return `` + number;
  }
};

// const addLeadingZero = (number) => number < 10 ? `0${number} : number
