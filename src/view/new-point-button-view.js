
import View from './view.js';

function createNewPointButtonView() {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

export default class NewPointButtonView extends View{
  getTemplate() {
    return createNewPointButtonView();
  }

}
