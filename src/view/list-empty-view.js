import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const listEmptyTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now'
};

function createListEmptyView(filterType) {
  const istEmptyTextValue = listEmptyTextType[filterType];
  return `
  <p class="trip-events__msg">${istEmptyTextValue}</p>
  `;
}

export default class ListEmptyView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyView(this.#filterType);
  }

}
