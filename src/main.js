import {createMainMenuTemplate} from './components/main-menu.js';
import {createTripInfoTemplate} from './components/trip-info.js';
import {createMainFilterTemplate} from './components/filter.js';
import {createTripSortTemplate} from './components/sort.js';
import {createTripListTemplate} from './components/list.js';
import {createTripEventTemplate} from './components/event.js';
import {createTripEventEditItemTemplate} from './components/event-edit.js';
import {createTripEventCreateTemplate} from './components/event-create.js';

const EVENT_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripHeaderElement = document.querySelector(`.trip-main`);
render(tripHeaderElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-main__trip-controls `);

render(tripControlsElement.querySelector(`h2`), createMainMenuTemplate(), `afterend`);
render(tripControlsElement, createMainFilterTemplate(), `beforeend`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createTripSortTemplate(), `beforeend`);

render(tripEventsElement, createTripListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createTripEventCreateTemplate(), `beforeend`);
render(tripEventsListElement, createTripEventEditItemTemplate(), `beforeend`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createTripEventTemplate(), `beforeend`);
}
