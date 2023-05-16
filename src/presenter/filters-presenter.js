import FilterView from '../view/filters-view.js';
import {render} from '../render.js';

export default class FiltersPresenter {
  constructor({filterContainer, pointsModel}) {
    this.filterContainer = filterContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new FilterView(), this.filterContainer);
  }
}
