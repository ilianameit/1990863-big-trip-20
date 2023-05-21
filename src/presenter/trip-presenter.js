import TripView from '../view/trip-view.js';
import { RenderPosition, render } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #points = [];

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new TripView(), this.#tripContainer, RenderPosition.AFTERBEGIN);
  }
}
