import {createElement, getDateComponents} from '../utils.js';

const createTripInfoTemplate = (points) => {

  if (points.length === 0) {
    return (
      `<section class="trip-main__trip-info  trip-info">
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
        </p>
      </section>`
    );
  }

  const tripFirstDay = points[0].date_from;
  const tripLastDay = points[points.length - 1].date_to;

  const getTripPeriod = (firstDay, lastDay) => {
    const firstDayComponent = getDateComponents(firstDay);
    const lastDayComponent = getDateComponents(lastDay);

    //  формат mmmm dd - dd
    if (firstDayComponent.year === lastDayComponent.year && firstDayComponent.month === lastDayComponent.month) {
      return `${firstDayComponent.textMonth} ${firstDayComponent.day}&nbsp;&mdash;&nbsp;${lastDayComponent.day}`;
    }

    //  формат mmmm dd - mmmm dd
    if (firstDayComponent.year === lastDayComponent.year) {
      return `${firstDayComponent.textMonth} ${firstDayComponent.day}&nbsp;&mdash;&nbsp;${lastDayComponent.textMonth} ${lastDayComponent.day}`;
    }

    //  формат yyyy mmmm dd - yyyy mmmm dd
    return `${firstDayComponent.year} ${firstDayComponent.textMonth} ${firstDayComponent.day}&nbsp;&mdash;&nbsp;${lastDayComponent.year} ${lastDayComponent.textMonth} ${lastDayComponent.day}`;
  };

  const mainPrice = points.reduce((sum, current) => sum + current.base_price +
    current.offers.reduce((sumOffers, currentOffer) => sumOffers + currentOffer.price, 0), 0);


  const MOVEMENTS = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
  let cities = points.filter((item) => MOVEMENTS.has(item.type)).map((item) => item.destination.name);
  // console.log(cities);
  for (let i = 0; i < cities.length; i++) {
    if (cities[i] === cities[i + 1]) {
      cities.splice(i, 1);
      // i=-1;
      i--;
    }
  }
  // console.log(cities);

  let tripRoute = ``;
  if (cities.length === 1) {
    tripRoute = cities[0];
  } else {
    if (cities.length < 4) {
      tripRoute = cities.join(` &mdash; `);
    } else {
      tripRoute = [cities[0], `&hellip;`, cities[cities.length - 1]].join(` &mdash; `);
    }
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>

        <p class="trip-info__dates">${getTripPeriod(tripFirstDay, tripLastDay)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${mainPrice}</span>
      </p>
    </section>`
  );
};

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
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
