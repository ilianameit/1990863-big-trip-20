
import {createElement} from '../render.js';

function createLoadingView() {
  return '';
}

export default class LoadingView {
  getTemplate() {
    return createLoadingView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
