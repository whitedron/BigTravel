import {createElement, getDateComponents, getDatesDifference, writeAction} from '../utils.js';

const renderOffers = (offers) => {
  return offers.map((offer) =>
  `<li class="event__offer">
   <span class="event__offer-title">${offer.title}</span>
   &plus;
   &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
   </li>`).join(``);
};

const createTripEventTemplate = (point) => {
  const {base_price, destination, type, offers, date_from, date_to} = point;

  const eventOffers = offers.length > 0
    ? `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${renderOffers(offers.slice(0,3))}
    </ul>`
    : ``;

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${writeAction(type)} ${destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${date_from.toISOString()}">${getDateComponents(date_from).hours}:${getDateComponents(date_from).minutes}</time>
          &mdash;
          <time class="event__end-time" datetime="${date_to.toISOString()}">${getDateComponents(date_to).hours}:${getDateComponents(date_to).minutes}</time>
        </p>
        <p class="event__duration">${getDatesDifference(date_from, date_to)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${base_price}</span>
      </p>

      ${eventOffers}

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
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
