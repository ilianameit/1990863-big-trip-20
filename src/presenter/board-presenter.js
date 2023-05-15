import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();

  #listPoints = [];
  #listOffers = null;
  #listDestination = null;
  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    this.#listOffers = this.#pointsModel.offers;
    this.#listDestination = this.#pointsModel.destinations;

    render(new SortView(), this.#listContainer);
    render(this.#listComponent, this.#listContainer);
    //render(new EditFormView({point: this.#listPoints[0], allOffers:  this.#listOffers, allDestinations: this.#listDestination}), this.#listComponent.element);

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i]);
    }
  }

  #renderPoint(point){
    const pointComponent = new PointView({point, allOffers:  this.#listOffers, allDestinations: this.#listDestination});
    render(pointComponent, this.#listComponent.element);
  }
}
