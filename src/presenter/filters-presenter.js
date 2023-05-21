import FilterView from '../view/filters-view.js';
import { render } from '../framework/render.js';

export default class FiltersPresenter {
  #filterContainer = null;
  #filters = null;

  constructor({filterContainer, filters}) {
    this.#filterContainer = filterContainer;
    this.#filters = filters;
  }

  init() {


    render(new FilterView({filters: this.#filters}), this.#filterContainer);
  }
}
