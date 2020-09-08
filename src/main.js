import SiteMenu from './components/main-menu.js';
import MainFilter from './components/filter.js';
import EventSort from './components/sort.js';
import EventList from './components/list.js';
import BlankList from './components/blank-list.js';
import TripInfo from './components/trip-info.js';
import TripDay from './components/day-event-list.js';
import Event from './components/event.js';
import EditEvent from './components/event-edit.js';

import {generateOffers, generatePoints} from './mock/point';
import {getDateComponents} from './utils/common.js';
import {render, RenderPosition, remove, replace} from './utils/render.js';

export const offers = generateOffers();
const points = generatePoints();

const tripHeaderElement = document.querySelector(`.trip-main`);
render(tripHeaderElement, new TripInfo(points), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-main__trip-controls `);
render(tripControlsElement, new SiteMenu(), RenderPosition.AFTER, tripControlsElement.querySelector(`h2`));

render(tripControlsElement, new MainFilter(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const renderEvent = (tripDayElement, event, offers) => {
  const eventComponent = new Event(event);
  const eventEditComponent = new EditEvent(event, offers);

  const replaceEventToEditEvent = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditEventToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditEventToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setExpandClickHandler(() => {
    document.addEventListener(`keydown`, onEscKeyDown);
    replaceEventToEditEvent();
  });

  eventEditComponent.setRollupClickHandler(() =>{
    replaceEditEventToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceEditEventToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripDayElement, eventComponent, RenderPosition.BEFOREEND);
}


if (points.length === 0) {
  render(tripEventsElement, new BlankList(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new EventSort(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new EventList(), RenderPosition.BEFOREEND);
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

      render(tripEventsListElement, new TripDay(currentDate, tripDaysCount + 1), RenderPosition.BEFOREEND);
    };
    const currentDateContainer = tripEventsListElement.querySelector(`.day__date[datetime="${year}-${month}-${day}"]`)
      .closest(`.trip-days__item`)
      .querySelector(`.trip-events__list`);;

      renderEvent(currentDateContainer, points[i], offers);
  };
}
