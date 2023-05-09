import { getRandomPoint } from '../mock/point';
const POINT_COUNT = 10;

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints(){
    return this.points;
  }
}