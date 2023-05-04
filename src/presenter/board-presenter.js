import ListView from '../view/list-view.js';
import SortView from '../view/sorting-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  listComponent = new ListView();


  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortView(), this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new EditFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }


  }
}
