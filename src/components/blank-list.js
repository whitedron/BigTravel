import AbstractComponent from './abstract.js';

const createBlankListTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class BlankList extends AbstractComponent {

  getTemplate() {
    return createBlankListTemplate();
  }

}
