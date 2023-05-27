import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItem(){
  const sortData = Object.values(SortType);
  return sortData.map((item, index) => `
    <div class="trip-sort__item  trip-sort__item--${item}">
      <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" data-sort-type="${item}" ${index === 0 ? 'checked=""' : ''} ${(item === SortType.EVENT || item === SortType.OFFERS) ? 'disabled=""' : ''}>
      <label class="trip-sort__btn" for="sort-${item}">${item}</label>
    </div>`
  ).join('');
}
function createSortView() {
  const sortItems = createSortItem();
  return `
  <form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${sortItems}
  </form>`;
}

export default class SortView extends AbstractView{
  get template() {
    return createSortView();
  }
}
