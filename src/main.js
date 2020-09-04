import SiteMenu from './components/main-menu.js';
import MainFilter from './components/filter.js';
import EventSort from './components/sort.js';
import EventList from './components/list.js';
import BlankList from './components/blank-list.js';
import TripInfo from './components/trip-info.js';
import {createTripEventTemplate} from './components/event.js';
import {createTripEventEditItemTemplate} from './components/event-edit.js';
import {createTripEventCreateTemplate} from './components/event-create.js';
import {createDayListTemplate} from './components/day-event-list.js';
import {generateOffers} from './mock/point';
import {generatePoints} from './mock/point';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

export const offers = generateOffers();
const points = generatePoints();

const tripHeaderElement = document.querySelector(`.trip-main`);
renderElement(tripHeaderElement, new TripInfo(points).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-main__trip-controls `);
renderElement(tripControlsElement, new SiteMenu().getElement(), RenderPosition.AFTER, tripControlsElement.querySelector(`h2`));

renderElement(tripControlsElement, new MainFilter().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

if (points.length === 0) {
  renderElement(tripEventsElement, new BlankList().getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(tripEventsElement, new EventSort().getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, new EventList().getElement(), RenderPosition.BEFOREEND);
  const tripEventsListElement = tripEventsElement.querySelector(`.trip-days`);

  const firstDay = new Date(points[0].date_from.getFullYear(), points[0].date_from.getMonth(), points[0].date_from.getDate());
  const date = points[0].date_from;

  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : `${(date.getMonth() + 1)}`;
  const year = `${date.getFullYear()}`;

  const currentEventDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`);

  const tripDaysCount = Math.floor((date - firstDay) / (60 * 24 * 60 * 1000));

  if (!currentEventDateContainer) {
    renderTemplate(tripEventsListElement, createDayListTemplate(date, tripDaysCount + 1), `beforeend`);
  };
  const currentDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`)
    .closest(`.trip-days__item`)
    .querySelector(`.trip-events__list`);

  renderTemplate(currentDateContainer, createTripEventEditItemTemplate(points[0], offers), `beforeend`);


  for (let i = 1; i < points.length; i++) {
    const date = points[i].date_from;

    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : `${(date.getMonth() + 1)}`;
    const year = `${date.getFullYear()}`;

    const currentEventDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`);

    const tripDaysCount = Math.floor((date - firstDay) / (60 * 24 * 60 * 1000));

    if (!currentEventDateContainer) {
      renderTemplate(tripEventsListElement, createDayListTemplate(date, tripDaysCount + 1), `beforeend`);
    };
    const currentDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`)
      .closest(`.trip-days__item`)
      .querySelector(`.trip-events__list`);

    renderTemplate(currentDateContainer, createTripEventTemplate(points[i]), `beforeend`);
  }
}
