import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType){
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
        ${type === currentFilterType ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
  `;
}

function createFilterView(filters, currentFilterType) {
  const filterItemTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
`;
}

export default class FilterView extends AbstractView{
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterView(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
