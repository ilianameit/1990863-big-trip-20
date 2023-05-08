
import View from './view.js';

function createLoadingView() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingView extends View{
  getTemplate() {
    return createLoadingView();
  }

}
