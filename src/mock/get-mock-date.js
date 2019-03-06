import {getRandomInteger} from '../utils';

export const getMockDate = () => {
  const MAX_TIME_LENGTH = 1000 * 60 * 60 * 24;
  const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;
  const MS_IN_HOUR = 1000 * 60 * 60;
  const MS_IN_MINUTE = 1000 * 60;

  const dateNow = new Date();
  const start = new Date(getRandomInteger(dateNow.getTime(), dateNow.getTime() + MS_IN_WEEK));
  const end = new Date(getRandomInteger(start.getTime(), start.getTime() + MAX_TIME_LENGTH));

  const intervalInMs = (end.getTime() - start.getTime());
  const hours = Math.floor(intervalInMs / MS_IN_HOUR);
  const minutes = Math.floor(intervalInMs % MS_IN_HOUR / MS_IN_MINUTE);
  const interval = {
    hours,
    minutes
  };

  return {
    start,
    end,
    interval
  };
};
