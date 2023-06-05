import { getRandomPoint } from '../mock/point';
import { offers } from '../mock/offers';
import {destinations} from '../mock/destinations.js';
import Observable from '../framework/observable';
const POINT_COUNT = 10;

export default class PointModel extends Observable {
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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
