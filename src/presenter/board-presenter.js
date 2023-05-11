import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  listComponent = new ListView();


  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];
    this.listOffers = this.pointsModel.getOffers();
    this.listDestination = this.pointsModel.getDestination();
    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new EditFormView({point: this.listPoints[0], allOffers:  this.listOffers, allDestinations: this.listDestination}), this.listComponent.getElement());

    for (let i = 1; i < this.listPoints.length; i++) {
      render(new PointView({point: this.listPoints[i], allOffers:  this.listOffers, allDestinations: this.listDestination}), this.listComponent.getElement());
    }
  }
}
