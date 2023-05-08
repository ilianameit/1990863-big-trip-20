
import View from './view.js';

function createLoadingView() {
  return '';
}

export default class LoadingView extends View{
  getTemplate() {
    return createLoadingView();
  }

}
