import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      allOffers:  this.#listOffers,
      allDestinations: this.#listDestination,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editComponent = new EditFormView({
      point,
      allOffers:  this.#listOffers,
      allDestinations: this.#listDestination,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(editComponent, pointComponent);
    }
    function replaceFormToCard() {
      replace(pointComponent, editComponent);
    }
    render(pointComponent, this.#listComponent.element);
  }
}
