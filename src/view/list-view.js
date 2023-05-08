
import View from './view.js';

function createListView() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListView extends View{
  getTemplate() {
    return createListView();
  }
}
