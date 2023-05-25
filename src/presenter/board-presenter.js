import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';


export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new ListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

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

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      allDestinations: this.#listDestination,
      allOffers: this.#listOffers
    });
    pointPresenter.init(point);
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
