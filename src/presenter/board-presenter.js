import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

import { SortType, UpdateType, UserAction } from '../const.js';
import { sortPointsDay, sortPointsTime, sortPointsPrice } from '../utils/sort.js';


export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = null;

  #listOffers = null;
  #listDestination = null;
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsPrice);
    }
    return [...this.#pointsModel.points].sort(sortPointsDay);
  }

  init() {
    this.#listOffers = [...this.#pointsModel.offers];
    this.#listDestination = [...this.#pointsModel.destinations];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => { // реагирование на действия пользователя
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => { // реагирование на изменение модели
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      allDestinations: this.#listDestination,
      allOffers: this.#listOffers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderListEmpty() {
    render(this.#listEmptyComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(points) {
    points.forEach((point) =>
      this.#renderPoint(point)
    );
  }

  #clearBoard({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard(){
    const points = this.points;

    if(!points.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();

    render(this.#listComponent, this.#listContainer, RenderPosition.BEFOREEND);
    this.#renderPoints(points);
  }
}
