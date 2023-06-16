import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { getAllDestinations, returnCurrentOffers, returnDestination, isDatesEqual, isBasePriceEqual } from '../utils/point.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editPointComponent = null;

  #allDestinations = null;
  #allOffers = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, allDestinations, allOffers, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditFormView({
      point: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      destinationsList,
      destination,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if(prevPointComponent === null || prevTaskEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevTaskEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editPointComponent.shake(resetFormState);
  }

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom) || !isDatesEqual(this.#point.dateTo, update.dateTo) || !isBasePriceEqual(this.#point.basePrice, update.basePrice);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleCancelClick = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
