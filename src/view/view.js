import { createElement } from '../render.js';

function createView() {
  return '<></>';
}

export default class View {
  getTemplate() {
    return createView();
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

