import {createElement} from "../utils.js";

const createBlankListTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class BlankList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBlankListTemplate();
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
