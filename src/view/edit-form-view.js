import { upperFirstCase } from '../utils/common.js';
import { returnOfferType, humanizeEditTime, humanizeTime } from '../utils/point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  offers: [],
  type: ''
};

function createOffersTypeList(typeList, selectefType){
  if(typeList){
    return typeList.map(({type}, index) =>
      `
        <div class="event__type-item">
          <input id="event-type-${type}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" ${selectefType === type ? 'checked=""' : ''} value="${type}">
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
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${offer.id}"  data-offer-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${type}-${offer.id}">
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

  const listOffers = createOffersTypeList(allOffers, type);
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
        <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${humanizeEditTime(dateFrom)} ${humanizeTime(dateFrom)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${humanizeEditTime(dateTo)} ${humanizeTime(dateTo)}">
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

export default class EditFormView extends AbstractStatefulView {
  #allOffers = null;
  #destinationsList = null;
  #handleFormSubmit = null;
  #handleCancelClick = null;
  #destination = null;
  #allDestinations = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = BLANK_POINT, allOffers, allDestinations, destinationsList, destination, onFormSubmit, onCancelClick}) {
    super();
    this._setState(EditFormView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#destinationsList = destinationsList;
    this.#destination = destination;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormView(this._state, this.#allOffers, this.#destinationsList, this.#destination);
  }

  removeElement() {
    super.removeElement();
    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#offerTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);

    this.#setDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #offerTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const type = evt.target.value;
    this.updateElement({
      type,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const destination = evt.target.value;
    if(!destination || !(this.#destinationsList.includes(destination))) {
      return;
    }
    const destinationInfo = (this.#allDestinations).find(({name}) => name === destination);
    this.#destination = destinationInfo;
    this.updateElement({
      destination: destinationInfo.id
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const basePrice = evt.target.value >= 0 && evt.target.value !== '' ? evt.target.value : 0;
    this._setState({
      basePrice
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const offers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: offers.map((offer) => Number(offer.dataset.offerId))
    });
  };

  #dueDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dueDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,

        onClose: this.#dueDateFromChangeHandler,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dueDateToChangeHandler,
      },
    );

  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
