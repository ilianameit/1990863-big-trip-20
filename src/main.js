import TripView from './view/trip-view.js';
import FilterView from './view/filters-view.js';
import SortView from './view/sorting-view.js';
import EditFormView from './view/edit-form-view.js';
import ListView from './view/list-view.js';
import PointView from './view/point-view.js';
import ListPresenter from './presenter/board-presenter.js';

import {render} from './render.js';
import {RenderPosition} from './render.js';


const siteMainElement = document.querySelector('.page-body');
const siteHeaderTripElement = siteMainElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteBodyElement = siteMainElement.querySelector('.trip-events');

render(new TripView(), siteHeaderTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteHeaderFilterElement);
const listPresenter = new ListPresenter({listContainer: siteBodyElement});


listPresenter.init();
//const siteListElement = siteMainElement.querySelector('.trip-events__list');


