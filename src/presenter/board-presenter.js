import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { getAllDestinations, returnCurrentOffers, returnDestination } from '../utils/point.js';

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
    this.#listOffers = [...this.#pointsModel.offers];
    this.#listDestination = [...this.#pointsModel.destinations];

    this.#renderBoard();
  }

  #renderPoint(point, destination, allDestinations, destinationsList, currentOffers, allOffers){
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      currentOffers,
      destination,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editComponent = new EditFormView({
      point,
      allOffers,
      destinationsList,
      destination,
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

  #renderBoard(){
    if(!this.#listPoints.length) {
      render(new ListEmptyView(), this.#listContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    render(new SortView(), this.#listContainer, RenderPosition.AFTERBEGIN);
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.#listPoints.length; i++) {
      const point = this.#listPoints[i];
      const allDestinations = this.#listDestination;
      const destinationsList = getAllDestinations(allDestinations);
      const destination = returnDestination(point.destination, allDestinations);
      const allOffers = this.#listOffers;
      const currentOffers = returnCurrentOffers(point.type, point.offers, allOffers);

      this.#renderPoint(point, destination, allDestinations, destinationsList, currentOffers, allOffers);
    }
  }
}
