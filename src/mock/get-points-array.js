import {getMockPoint} from "./get-mock-point";

export const getPointsArray = (pointsQty) => {
  const pointsArray = [];
  for (let i = 0; i < pointsQty; i++) {
    const point = getMockPoint();
    pointsArray.push(point);
  }
  return pointsArray;
};
