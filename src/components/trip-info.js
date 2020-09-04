import {createElement, getFormattedDate} from '../utils.js';

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

  const mainPrice = points.reduce((sum, current) => sum + current.base_price +
    current.offers.reduce((sumOffers, currentOffer) => sumOffers + currentOffer.price, 0), 0);
  const firstDay = points[0].date_from;
  const lastDay = points[points.length-1].date_to;
  let tripDates = ``;
  if (getFormattedDate(firstDay).year === getFormattedDate(lastDay).year && getFormattedDate(firstDay).month === getFormattedDate(lastDay).month) {
    tripDates = `${getFormattedDate(firstDay).textMonth} ${getFormattedDate(firstDay).day}&nbsp;&mdash;&nbsp;${getFormattedDate(lastDay).day}`;
  } else {
    if (getFormattedDate(firstDay).year === getFormattedDate(lastDay).year) {
      tripDates = `${getFormattedDate(firstDay).textMonth} ${getFormattedDate(firstDay).day}&nbsp;&mdash;&nbsp;${getFormattedDate(lastDay).textMonth} ${getFormattedDate(lastDay).day}`;
    } else {
      tripDates = `${getFormattedDate(firstDay).year} ${getFormattedDate(firstDay).textMonth} ${getFormattedDate(firstDay).day}&nbsp;&mdash;&nbsp;${getFormattedDate(lastDay).year} ${getFormattedDate(lastDay).textMonth} ${getFormattedDate(lastDay).day}`;
    }
  }

  const MOVEMENTS = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
  let cities = points.filter((item) => MOVEMENTS.has(item.type)).map((item) => item.destination.name);
  console.log(cities);
  for (let i=0; i<cities.length; i++) {
    if (cities[i] === cities[i+1]) {
      cities.splice(i,1);
     // i=-1;
     i--;
    }
  }
  console.log(cities);

  let tripRoute=``;
  if (cities.length === 1) {
    tripRoute = cities[0]
  } else {
    if (cities.length < 4) {
      tripRoute = cities.join(` &mdash; `)
    } else {
      tripRoute = [cities[0], `&hellip;`,cities[cities.length-1]].join(` &mdash; `)
    }
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>

        <p class="trip-info__dates">${tripDates}</p>
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
