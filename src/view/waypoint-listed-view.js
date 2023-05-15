
import AbstractView from '../framework/view/abstract-view.js';

function createLoadingView() {
  return '';
}

export default class LoadingView extends AbstractView{
  get template() {
    return createLoadingView();
  }

}
