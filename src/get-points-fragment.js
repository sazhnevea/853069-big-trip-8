import {getRandomInteger} from "./utils";
import getTripPoint from "./get-trip-point";
import {getPointsArray} from "./mock/get-points-array";

const NumbersValue = {
  MAX_POINTS: 20,
  MIN_POINTS: 1,
  START_QTY_POINTS: 7,
};

export const getPointsFragment = () => {
  const Points = getRandomInteger(NumbersValue.MIN_POINTS, NumbersValue.MAX_POINTS);
  const pointsArray = getPointsArray(Points);

  let fragment = ``;
  for (let i = 0; i < Points; i++) {
    fragment += getTripPoint(pointsArray[i]);
  }

  return fragment;
};
