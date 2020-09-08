import AbstractComponent from './abstract.js';

const createTripListTemplate = () => {
  return (
    `<ul class="trip-days">

         </ul>`
  );
};

export default class EventList extends AbstractComponent {

  getTemplate() {
    return createTripListTemplate();
  }

}
