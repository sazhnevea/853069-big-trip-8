import {getMockPoint} from "./get-mock-point";

export const getPointsArray = (points) => {
  const pointsArray = [];

  for (let i = 0; i < points; i++) {
    const point = getMockPoint();
    pointsArray.push(point);
  }

  return pointsArray;
};
