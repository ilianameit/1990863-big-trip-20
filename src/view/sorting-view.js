import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItem(currentSortType){
  const sortData = Object.values(SortType);
  return sortData.map((item) => {
    const isSortElement = item !== SortType.EVENT && item !== SortType.OFFERS;
    return `
    <div class="trip-sort__item  trip-sort__item--${item}">
      <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" ${ isSortElement ? `data-sort-type="${item}"` : ''} ${currentSortType === item ? 'checked=""' : ''} ${isSortElement ? '' : 'disabled=""' }>
      <label class="trip-sort__btn" for="sort-${item}"   >${item}</label>
    </div>`;
  }).join('');
}
function createSortView(currentSortType) {
  const sortItems = createSortItem(currentSortType);
  return `
  <form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${sortItems}
  </form>`;
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #sortType = null;
  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#sortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortView(this.#sortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
