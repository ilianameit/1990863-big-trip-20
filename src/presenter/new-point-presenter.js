import { remove, render, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { UpdateType, UserAction } from '../const.js';
import { nanoid } from 'nanoid';
import { getAllDestinations } from '../utils/point.js';

export default class NewPontPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  #pointsModel = null;

  constructor({pointListContainer, onDataChange, onDestroy, pointsModel}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointsModel = pointsModel;
  }

  init() {
    if(this.#pointEditComponent !== null) {
      return;
    }
    const allOffers = this.#pointsModel.offers;
    const allDestinations = this.#pointsModel.destinations;
    const destinationsList = getAllDestinations(allDestinations);

    this.#pointEditComponent = new EditFormView({allOffers, allDestinations, destinationsList, onFormSubmit: this.#handleFormSubmit, onDeleteClick: this.#handleDeleteClick, isNewPoint: true});
    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
