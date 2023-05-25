import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import { getAllDestinations, returnCurrentOffers, returnDestination } from '../utils/point.js';


export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #allDestinations = null;
  #allOffers = null;
  #point = null;

  constructor({pointListContainer, allDestinations, allOffers}) {
    this.#pointListContainer = pointListContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
  }

  init(point) {
    this.#point = point;

    const destinationsList = getAllDestinations(this.#allDestinations);
    const destination = returnDestination(this.#point.destination, this.#allDestinations);
    const currentOffers = returnCurrentOffers(this.#point.type, this.#point.offers, this.#allOffers);

    this.#pointComponent = new PointView({
      point: this.#point,
      currentOffers,
      destination,
      onEditClick: this.#handleEditClick
    });

    this.#editPointComponent = new EditFormView({
      point: this.#point,
      allOffers: this.#allOffers,
      destinationsList,
      destination,
      onFormSubmit: this.#handleFormSubmit
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
