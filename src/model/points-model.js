import { getRandomPoint } from '../mock/point';
import { offers } from '../mock/offers';
import {destination} from '../mock/destination';
const POINT_COUNT = 10;

export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints(){
    return this.points;
  }

  getOffers(){
    return offers;
  }

  getDestination(){
    return destination;
  }
}
