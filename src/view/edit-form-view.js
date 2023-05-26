import { upperFirstCase } from '../utils/common.js';
import { returnOfferType, humanizeEditTime, humanizeTime } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  offers: [],
  type: ''
};

function createOffersTypeList(typeList){
  if(typeList){
    return typeList.map(({type}, index) =>
      `
        <div class="event__type-item">
          <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index}">${upperFirstCase(type)}</label>
        </div>
     `).join('');
  }
  return '';
}
function createDestinationList(destinations){
  if(destinations){
    return destinations.map((destinationName) =>
      `
        <option value="${destinationName}"></option>
      `
    ).join('');
  }
  return '';
}

function createOffers(type, allOffers, selectedOffers){
  const off = returnOfferType(type, allOffers);
  let offersView = '';
  off.reduce((accumulator, offer) => {
    const isChecked = selectedOffers.includes(offer.id);
    offersView += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}-1">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  },0);
  return offersView;
}

function createDestinationTemplate(descriptionInfo, pictures){
  const photosTape = () => {
    if(pictures.length > 0){
      return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map(({ src, description }) => `
            <img class="event__photo" src="${src}" alt="${description}">
          `)}
        </div>
      </div>
      `;
    } return('');
  };
  if(descriptionInfo !== null && descriptionInfo !== undefined){
    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${descriptionInfo}
        </p>

          ${photosTape()}
      </section>
    `;
  }
  return('');
}

function createEditFormView(point, allOffers, destinationsList, destination) {
  const {basePrice, dateFrom, dateTo, offers, type} = point;
  const {name, description, pictures} = destination;

  const listOffers = createOffersTypeList(allOffers);
  const destinationList = createDestinationList(destinationsList);

  const offersOfType = createOffers(type, allOffers, offers);
  const destinationTemplate = createDestinationTemplate(description, pictures);

  return `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" src="img/icons/${type}.png" alt="Event type icon" width="17" height="17">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${listOffers}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEditTime(dateFrom)} ${humanizeTime(dateFrom)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEditTime(dateTo)} ${humanizeTime(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersOfType}
        </div>
      </section>

      ${destinationTemplate}
    </section>
  </form>
</li>
  `;
}

export default class EditFormView extends AbstractView{
  #point = null;
  #allOffers = null;
  #destinationsList = null;
  #handleFormSubmit = null;
  #handleCancelClick = null;
  #destination = null;
  constructor({point = BLANK_POINT, allOffers, destinationsList, destination, onFormSubmit, onCancelClick}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#destinationsList = destinationsList;
    this.#destination = destination;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#cancelClickHandler);
  }

  get template() {
    return createEditFormView(this.#point, this.#allOffers, this.#destinationsList, this.#destination);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };
}
