import EventSort from './components/sort.js';
import EventList from './components/list.js';
import BlankList from './components/blank-list.js';
import TripDay from './components/day-event-list.js';
import Event from './components/event.js';
import EditEvent from './components/event-edit.js';

export default class TripController {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._eventSortComponent = new EventSort();
    this._eventListComponent = new EventList();
   // this._tripDayComponent = new TripDay();
    this._blankListComponent = new BlankList();
  }

  init(points, offers) {
    this._points = points.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._sourcedPoints = points.slice();
    this._firstTripDay = this._getFirstTripDay();

    this._offers = offers.slice();
    this._renderEventContent();
  }

  _getFirstTripDay() {
    if (this._points[0]) {
     return new Date(this._points[0].date_from.getFullYear(), this._points[0].date_from.getMonth(), this._points[0].date_from.getDate());
    }
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._eventSortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(point) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js

    const currentDate = point.date_from;

    const eventComponent = new Event(point);
    const eventEditComponent = new EditEvent(point, this._offers);

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

    render(this._getCurrentEventDataContainer(currentDate), eventComponent, RenderPosition.BEFOREEND);

  }

  _renderEvents() {
    // Метод для рендеринга N-задач за раз
    this._points.forEach((point) => {
      this._renderTripDay(point);
      this._renderEvent(point);
    });
  }

  _getCurrentEventDataContainer(currentDate) {

    const day = getDateComponents(currentDate).day;
    const month = getDateComponents(currentDate).month;
    const year = getDateComponents(currentDate).year;

    const currentEventDateContainer = this._eventListComponent.getElement().querySelector(`.day__date[datetime="${year}-${month}-${day}"]`);

    if (currentEventDateContainer) {
      return currentEventDateContainer.closest(`.trip-days__item`).querySelector(`.trip-events__list`);
    } else {
      return null
    }
  }

  _renderTripDay(point) {
    const currentDate = point.date_from;
/*
    const day = getDateComponents(currentDate).day;
    const month = getDateComponents(currentDate).month;
    const year = getDateComponents(currentDate).year;

    const currentEventDateContainer = this._eventListComponent.getElement().querySelector(`.day__date[datetime="${year}-${month}-${day}"]`);
 */
    if (!this._getCurrentEventDataContainer(currentDate)) {
      const tripDaysCount = Math.floor((currentDate - firstDay) / (60 * 24 * 60 * 1000));
      tripDayComponent = new TripDay(currentDate, tripDaysCount + 1);
      render(this._eventListComponent, tripDayComponent, RenderPosition.BEFOREEND);
    };

    /* return this._eventListComponent.getElement().querySelector(`.day__date[datetime="${year}-${month}-${day}"]`)
    .closest(`.trip-days__item`)
    .querySelector(`.trip-events__list`); */

  }

  _renderBlankList() {
    // Метод для рендеринга заглушки
    render(this._tripContainer, this._blankListComponent, RenderPosition.BEFOREEND);
  }

  _renderEventList() {
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEventContent() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    if (this._points.length === 0) {
      this._renderBlankList();
      return
    }

    this.__renderSort();
    this.__renderEventList();

  }
}
