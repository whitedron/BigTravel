import {createMainMenuTemplate} from './components/main-menu.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createMainFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/sort.js';
import {createTripListTemplate} from './components/list.js';
import {createTripEventTemplate} from './components/event.js';
import {createTripEventEditItemTemplate} from './components/event-edit.js';
import {createTripEventCreateTemplate} from './components/event-create.js';
import {createDayListTemplate} from './components/day-event-list.js';
import {generateDestanation} from './mock/point';
import {generateOffers} from './mock/point';
import {generatePoints} from './mock/point';

const EVENT_COUNT = 3;

//console.log(generateDestanation());
//export const offers = generateOffers();

export const offers = generateOffers();
const points = generatePoints();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripHeaderElement = document.querySelector(`.trip-main`);
render(tripHeaderElement, createTripInfoTemplate(points), `afterbegin`);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-main__trip-controls `);

render(tripControlsElement.querySelector(`h2`), createMainMenuTemplate(), `afterend`);
render(tripControlsElement, createMainFilterTemplate(), `beforeend`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createTripSortTemplate(), `beforeend`);

render(tripEventsElement, createTripListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-days`);

//render(tripEventsListElement, createTripEventCreateTemplate(), `beforeend`);
//render(tripEventsListElement, createTripEventEditItemTemplate(points[0], offers), `beforeend`);
const firstDay = new Date(points[0].date_from.getFullYear(), points[0].date_from.getMonth(), points[0].date_from.getDate() );


for (let i = 0; i < points.length; i++) {
  const date = points[i].date_from;

  const day = date.getDate()<10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = (date.getMonth()+1)<10 ? `0${(date.getMonth()+1)}` : `${(date.getMonth()+1)}`;
  const year = `${date.getFullYear()}`;

  const currentEventDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`);

  const tripDaysCount = Math.floor((date - firstDay) / (60 * 24 * 60 * 1000));

  if (!currentEventDateContainer) {
    render(tripEventsListElement, createDayListTemplate(date, tripDaysCount+ 1), `beforeend`);
  };
  const currentDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`)
  .closest(`.trip-days__item`)
  .querySelector(`.trip-events__list`);

  render(currentDateContainer, createTripEventTemplate(points[i]), `beforeend`);
}
