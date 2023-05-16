import PointModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

//import {RenderPosition} from './render.js';

const siteMainElement = document.querySelector('.page-body');
const siteHeaderTripElement = siteMainElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointModel();
const tripPresenter = new TripPresenter({tripContainer: siteHeaderTripElement, pointsModel});
const filterPresenter = new FiltersPresenter({filterContainer: siteHeaderFilterElement, pointsModel});
const boardPresenter = new BoardPresenter({listContainer: siteBodyElement, pointsModel});

tripPresenter.init();
filterPresenter.init();
boardPresenter.init();


