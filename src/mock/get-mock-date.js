import {getRandomInteger} from '../utils';

export const getMockDate = () => {
  const HOURS = getRandomInteger(1, 168);
  const HOURS_IN_DAY = 24;

  const start = new Date();
  start.setHours(start.getHours() + HOURS);

  const end = new Date();
  end.setHours(start.getHours() + getRandomInteger(1, HOURS_IN_DAY));

  const interval = new Date();
  interval.setHours(end.getHours() - start.getHours());

  const schedule = {
    start,
    end,
    interval,
  };

  return schedule;
};

// три объекта дата
// qty убрать
// разбить энтерами логику
// pointsArray переименовать
// удалить комментарий
// mock убрать
