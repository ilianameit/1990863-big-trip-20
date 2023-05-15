import { getRandomPoint } from '../mock/point';
import { offers } from '../mock/offers';
import {destinations} from '../mock/destinations.js';
const POINT_COUNT = 10;

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #offers = offers;
  #destinations = destinations;

  get points(){
    return this.#points;
  }

  get offers(){
    return this.#offers;
  }

  get destinations(){
    return this.#destinations;
  }
}
