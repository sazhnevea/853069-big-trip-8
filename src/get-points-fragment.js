import {getRandomInteger} from "./utils";

import getTripPoint from "./get-trip-point";

import {getPointsArray} from "./mock/get-points-array";

const QtyValue = {
  MAX_QTY_POINTS: 20,
  MIN_QTY_POINTS: 1,
  START_QTY_POINTS: 7,
};

export const getPointsFragment = () => {
  const qtyPoints = getRandomInteger(QtyValue.MIN_QTY_POINTS, QtyValue.MAX_QTY_POINTS);
  const pointsArray = getPointsArray(qtyPoints);
  let fragment = ``;
  for (let i = 0; i < qtyPoints; i++) {
    fragment += getTripPoint(pointsArray[i]);
  }
  return fragment;
};
