const renderAction = (type) => {
  const MOVEMENTS = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
  const action = MOVEMENTS.has(type) ? `${type} to` : `${type} in`;
  return `${action.charAt(0).toUpperCase()}${action.slice(1)}`;
};

const POINT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const renderTypesList = (eventTypes, checkedType) => {
  return eventTypes.map((type) => `
  <div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === checkedType ? `checked` : ``}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase()}${type.slice(1)}</label>
  </div>`).join(``);
}

//// 18/03/19 12:25
const getFormatedDate = (date) => {
 const day = date.getDate()<10 ? `0${date.getDate()}` : `${date.getDate()}`;
 const month = (date.getMonth()+1)<10 ? `0${(date.getMonth()+1)}` : `${(date.getMonth()+1)}`;
 const year = `${date.getFullYear()}`.slice(-2);
 const hour = date.getHours()<10 ? `0${date.getHours()}` : `${date.getHours()}`;
 const minutes = date.getMinutes()<10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

 return `${day}/${month}/${year} ${hour}:${minutes}`;
}

export const createTripEventEditItemTemplate = (point, allOffers) => {
  const {base_price, destination, type, offers, date_from, date_to, is_favorite} = point;

  const currentTypeOffers = allOffers.filter(item => item.type === type);

  const currentTypeOffersTemplate = currentTypeOffers.map((offerTypeItem) => {
   return offerTypeItem.offers.map((offer) => {
       return `
       <div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.price}" type="checkbox" name="event-offer-${offer.title}-${offer.price}">
       <label class="event__offer-label" for="event-offer-${offer.title}-${offer.price}">
         <span class="event__offer-title">${offer.title}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
       </label>
     </div>
       `
    })
  }).join(``);


    const currentItemOffers = currentTypeOffersTemplate !=``
    ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
     ${currentTypeOffersTemplate}
    </div>
  </section>`
    : ``;


  const isFavorite = is_favorite ? `checked` : ``;
  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                 ${renderTypesList(POINT_TYPES.slice(0,-3), type)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${renderTypesList(POINT_TYPES.slice(-3), type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${renderAction(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatedDate(date_from)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatedDate(date_to)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${base_price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${currentItemOffers}
        </section>
      </form>
    </li>`
  );
};
