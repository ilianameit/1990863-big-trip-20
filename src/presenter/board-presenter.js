import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';


export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #listPoints = [];
  #listOffers = null;
  #listDestination = null;
  #pointPresenters = new Map();

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

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
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

  #renderSort() {
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
