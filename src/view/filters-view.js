import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked){
  const {type, count} = filter;
  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${count === 0 ? 'disabled' : ''}
        ${isChecked ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
  `;
}

function createFilterView(filters) {
  const filterItemTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
`;
}

export default class FilterView extends AbstractView{
  #filters = null;
  constructor({filters}){
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterView(this.#filters);
  }
}
