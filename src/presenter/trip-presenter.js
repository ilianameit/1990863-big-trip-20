import TripView from '../view/trip-view.js';
import { RenderPosition, render } from '../framework/render.js';
import { calculatePrice, returnTripDestinations, returnUniqDestinations } from '../utils/trip.js';
import { Format, humanizeDateFormat } from '../utils/point.js';
import { sortPointsDay } from '../utils/sort.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #points = [];
  #listDestination = [];
  #listOffers = [];

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points].sort(sortPointsDay);
    this.#listDestination = [...this.#pointsModel.destinations];
    this.#listOffers = [...this.#pointsModel.offers];

    this.#renderTrip();
  }

  #renderTrip() {
    if(this.#points.length === 0){
      return;
    }
    const points = this.#points;
    const tripInfo = {
      price: calculatePrice(points, this.#listOffers),
      uniqDestinations: returnUniqDestinations(points, this.#listDestination),
      destinations: returnTripDestinations(points, this.#listDestination),
      monthStart: humanizeDateFormat(Format.MONTH, points[0].dateFrom),
      dayStart: humanizeDateFormat(Format.DAY, points[0].dateFrom),
      monthEnd:  humanizeDateFormat(Format.MONTH, points[points.length - 1].dateTo),
      dayEnd: humanizeDateFormat(Format.DAY, points[points.length - 1].dateTo)
    };

    render(new TripView({ points, tripInfo}), this.#tripContainer, RenderPosition.AFTERBEGIN);
  }
}
