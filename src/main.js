import TripView from './view/trip-view.js';
import FilterView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/points-model.js';

import {render} from './render.js';
import {RenderPosition} from './render.js';


const siteMainElement = document.querySelector('.page-body');
const siteHeaderTripElement = siteMainElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

render(new TripView(), siteHeaderTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteHeaderFilterElement);
const pointsModel = new PointModel();
const boardPresenter = new BoardPresenter({listContainer: siteBodyElement, pointsModel});


boardPresenter.init();


