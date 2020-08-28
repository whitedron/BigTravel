const renderAction = (type) => {
  const MOVEMENTS = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
  const action = MOVEMENTS.has(type) ? `${type} to` : `${type} in`;
  return `${action.charAt(0).toUpperCase()}${action.slice(1)}`;
}

const renderOffers = (offers) => {
  return offers.map((offer) => `
  <li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
 </li>`).join(``);
}

const getTimeInHHMM = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  return `${hours}:${minutes}`;
};

const getDatesDifference = (dateFrom = 0, dateTo = 0) => {
const differenceInMinutes = Math.floor(dateTo/(60*1000)) - Math.floor(dateFrom/(60*1000));
const differenceMinutes = differenceInMinutes%60 <10 ? `0${differenceInMinutes%60}M` : `${differenceInMinutes%60}M` ;
const differenceHours = (Math.floor(differenceInMinutes/60))%24 < 10 ? `0${Math.floor((differenceInMinutes/60))%24}H` : `${Math.floor((differenceInMinutes/60))%24}H`;
const differenceDays = Math.floor(differenceInMinutes/(60*24))<10 ? `0${Math.floor(differenceInMinutes/(60*24))}D` : `${Math.floor(differenceInMinutes/(60*24))}D`;

if (differenceInMinutes < 0) {return ``};  /// ошибка дат
if (differenceInMinutes < 60) {return `${differenceMinutes}`};  // до часа
if (differenceInMinutes < 60*24) {return `${differenceHours} ${differenceMinutes}`};  // до суток
return `${differenceDays} ${differenceHours} ${differenceMinutes}`;
};

export const createTripEventTemplate = (point) => {
  const {base_price, destination, type, offers, date_from, date_to} = point;

  const eventOffers = offers.length > 0
    ? `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${renderOffers(offers.slice(0,2))}
    </ul>`
    : ``;

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${renderAction(type)} ${destination.name}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${date_from.toISOString()}">${getTimeInHHMM(date_from)}</time>
          &mdash;
          <time class="event__end-time" datetime="${date_to.toISOString()}">${getTimeInHHMM(date_to)}</time>
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
  </li>
`
  );
};
