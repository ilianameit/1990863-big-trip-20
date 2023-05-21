import TripView from '../view/trip-view.js';
import { RenderPosition, render } from '../framework/render.js';
import { calculatePrice } from '../utils/point.js';
import { returnUniqDestinations } from '../utils/point.js';
import { Format, humanizeDateFormat } from '../utils/point.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #points = [];
  #listDestination = [];

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#listDestination = [...this.#pointsModel.destinations];

    this.#renderTrip();
  }

  #renderTrip() {
    if(this.#points.length === 0){
      return;
    }
    const points = this.#points;
    const tripInfo = {
      price: calculatePrice(points),
      destinations: returnUniqDestinations(points, this.#listDestination),
      monthStart: humanizeDateFormat(Format.MONTH, points[0].dateFrom),
      dayStart: humanizeDateFormat(Format.DAY, points[0].dateFrom),
      monthEnd:  humanizeDateFormat(Format.MONTH, points[points.length - 1].dateTo),
      dayEnd: humanizeDateFormat(Format.DAY, points[points.length - 1].dateTo)
    };

    render(new TripView({ points, tripInfo}), this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

}
