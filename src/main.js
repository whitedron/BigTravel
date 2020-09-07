import SiteMenu from './components/main-menu.js';
import MainFilter from './components/filter.js';
import EventSort from './components/sort.js';
import EventList from './components/list.js';
import BlankList from './components/blank-list.js';
import TripInfo from './components/trip-info.js';
import TripDay from './components/day-event-list.js';
import Event from './components/event.js';
import EditEvent from './components/event-edit.js';

import { generateOffers } from './mock/point';
import { generatePoints } from './mock/point';
import { renderElement, RenderPosition, getDateComponents } from './utils.js';

export const offers = generateOffers();
const points = generatePoints();

const tripHeaderElement = document.querySelector(`.trip-main`);
renderElement(tripHeaderElement, new TripInfo(points).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-main__trip-controls `);
renderElement(tripControlsElement, new SiteMenu().getElement(), RenderPosition.AFTER, tripControlsElement.querySelector(`h2`));

renderElement(tripControlsElement, new MainFilter().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const renderEvent = (tripDayElement, event, offers) => {
  const eventComponent = new Event(event);
  const eventEditComponent = new EditEvent(event, offers);

  const replaceEventToEditEvent = () => {
    tripDayElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditEventToEvent = () => {
    tripDayElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditEventToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
    replaceEventToEditEvent();
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEditEventToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditEventToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(tripDayElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
}


if (points.length === 0) {
  renderElement(tripEventsElement, new BlankList().getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(tripEventsElement, new EventSort().getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, new EventList().getElement(), RenderPosition.BEFOREEND);
  const tripEventsListElement = tripEventsElement.querySelector(`.trip-days`);

  const firstDay = new Date(points[0].date_from.getFullYear(), points[0].date_from.getMonth(), points[0].date_from.getDate());


  for (let i = 0; i < points.length; i++) {

    const currentDate = points[i].date_from;

    const day = getDateComponents(currentDate).day;
    const month = getDateComponents(currentDate).month;
    const year = getDateComponents(currentDate).year;

    const currentEventDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`);

    if (!currentEventDateContainer) {
      const tripDaysCount = Math.floor((currentDate - firstDay) / (60 * 24 * 60 * 1000));

      renderElement(tripEventsListElement, new TripDay(currentDate, tripDaysCount + 1).getElement(), RenderPosition.BEFOREEND);
    };
    const currentDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`)
      .closest(`.trip-days__item`)
      .querySelector(`.trip-events__list`);;

      renderEvent(currentDateContainer, points[i], offers);
  };
}
