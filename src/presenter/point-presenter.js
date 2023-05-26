import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { getAllDestinations, returnCurrentOffers, returnDestination } from '../utils/point.js';


export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #allDestinations = null;
  #allOffers = null;
  #point = null;

  #handleDataChange = null;

  constructor({pointListContainer, allDestinations, allOffers, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const destinationsList = getAllDestinations(this.#allDestinations);
    const destination = returnDestination(this.#point.destination, this.#allDestinations);
    const currentOffers = returnCurrentOffers(this.#point.type, this.#point.offers, this.#allOffers);

    const prevPointComponent = this.#pointComponent;
    const prevTaskEditComponent = this.#editPointComponent;

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
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleFormCancel
    });

    if(prevPointComponent === null || prevTaskEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if(this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#pointListContainer.contains(prevTaskEditComponent.element)) {
      replace(this.#editPointComponent, prevTaskEditComponent);
    }

    remove(prevPointComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
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

  #handleFormSubmit = (point) => {
    this.handleDataChange(point);
    this.#replaceFormToCard();
  };

  #handleFormCancel = () => {
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
