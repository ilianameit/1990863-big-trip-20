
import {humanizeDate, humanizeTime, formatToHtmlAttr, differenceTime,} from '../utils/common.js';
import AbstractView from '../framework/view/abstract-view.js';

function createCurrentOffers(selectedOffers){
  if(selectedOffers) {
    return selectedOffers.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
    ).join('');
  }
  return '';
}

function createPointView(point, offers, destination) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;

  const offersCurrent = createCurrentOffers(offers);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatToHtmlAttr(dateFrom)}">
      ${humanizeDate(dateFrom)}
    </time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time
          class="event__start-time"
          datetime="${formatToHtmlAttr(dateFrom)}T${humanizeTime(dateFrom)}">
            ${humanizeTime(dateFrom)}
        </time>
        &mdash;
        <time class="event__end-time" datetime="${formatToHtmlAttr(dateTo)}T${humanizeTime(dateTo)}">
          ${humanizeTime(dateTo)}
        </time>
      </p>
      <p class="event__duration">${differenceTime(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersCurrent}
    </ul>
    <button class="event__favorite-btn event__favorite-btn--${isFavorite ? 'active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class PointView extends AbstractView{
  #point = null;
  #currentOffers = null;
  #destination = null;
  #handleEditClick = null;
  constructor({point, currentOffers, destination, onEditClick}){
    super();
    this.#point = point;
    this.#currentOffers = currentOffers;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointView(this.#point, this.#currentOffers, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

}
