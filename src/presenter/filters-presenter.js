import FilterView from '../view/filters-view.js';
import { render } from '../framework/render.js';

export default class FiltersPresenter {
  #filterContainer = null;
  #pointsModel = null;

  #points = [];

  constructor({filterContainer, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new FilterView(), this.#filterContainer);
  }
}
