import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointsDay, sortPointsTime, sortPointsPrice } from '../utils/sort.js';


export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = null;

  #listPoints = [];
  #listOffers = null;
  #listDestination = null;
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points].sort(sortPointsDay);
    this.#listOffers = [...this.#pointsModel.offers];
    this.#listDestination = [...this.#pointsModel.destinations];

    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      allDestinations: this.#listDestination,
      allOffers: this.#listOffers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderListEmpty() {
    render(this.#listEmptyComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#listPoints = [...this.#sourcedBoardPoints].sort(sortPointsDay);
        break;
      case SortType.TIME:
        this.#listPoints = [...this.#sourcedBoardPoints].sort(sortPointsTime);
        break;
      case SortType.PRICE:
        this.#listPoints = [...this.#sourcedBoardPoints].sort(sortPointsPrice);
        break;
      default:
        break;
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);
  }

  #renderPointList() {
    render(this.#listComponent, this.#listContainer, RenderPosition.BEFOREEND);
  }

  #renderBoard(){
    if(!this.#listPoints.length) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints(this.#listPoints);
  }
}
