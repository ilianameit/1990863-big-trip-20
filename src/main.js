import {RenderPosition, render} from './framework/render.js';
import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic ai4h439os13374hi';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.page-body');
const siteHeaderTripElement = siteMainElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});

const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({tripContainer: siteHeaderTripElement, pointsModel});
const filterPresenter = new FiltersPresenter({filterContainer: siteHeaderFilterElement, filterModel, pointsModel});
const boardPresenter = new BoardPresenter({
  listContainer: siteBodyElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({onClick: handleNewPointButtonClick});
function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}
function handleNewPointButtonClick () {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}
render(newPointButtonComponent, siteHeaderTripElement, RenderPosition.BEFOREEND);

tripPresenter.init();
filterPresenter.init();
boardPresenter.init();

pointsModel.init();
