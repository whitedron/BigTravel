import {createElement} from "../utils.js";

const createTripListTemplate = () => {
  return (
    `<ul class="trip-days">

         </ul>`
  );
};

export default class EventList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
