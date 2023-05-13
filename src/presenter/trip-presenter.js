import TripView from '../view/trip-view.js';
import {render} from '../render.js';
import { RenderPosition } from '../render.js';
export default class TripPresenter {
  constructor({tripContainer, pointsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new TripView(), this.tripContainer, RenderPosition.AFTERBEGIN);
  }
}
