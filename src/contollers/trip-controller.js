import EventSort from '../components/sort.js';
import EventList from '../components/list.js';
import BlankList from '../components/blank-list.js';
import TripDay from '../components/day-event-list.js';
import Event from '../components/event.js';
import EditEvent from '../components/event-edit.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {getDateComponents} from '../utils/common.js';

export default class TripController {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._eventSortComponent = new EventSort();
    this._eventListComponent = new EventList();
    this._blankListComponent = new BlankList();
  }

  init(points, offers) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._firstTripDay = this._getFirstTripDay();
    this._offers = offers.slice();
    this._renderEventContent();
  }

  _getFirstTripDay() {
    // определение первого дня путешествия
    if (this._points[0]) {
     return new Date(this._points[0].date_from.getFullYear(), this._points[0].date_from.getMonth(), this._points[0].date_from.getDate());
    }
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._eventSortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(point) {
    // Метод, создания и рендеринга события и навешивание на него обработчиков

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
    // Метод для рендеринга всех событий
    this._points.forEach((point) => {
      this._renderTripDay(point);
      this._renderEvent(point);
    });
  }

  _getCurrentEventDataContainer(currentDate) {
    // вспомогательнаф функция поиска уже созданного контейнера событий дня
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
    // проверка и создание контейнера текущего дня
    const currentDate = point.date_from;

    if (!this._getCurrentEventDataContainer(currentDate)) {
      const tripDaysCount = Math.floor((currentDate - this._firstTripDay) / (60 * 24 * 60 * 1000));
      const tripDayComponent = new TripDay(currentDate, tripDaysCount + 1);
      render(this._eventListComponent, tripDayComponent, RenderPosition.BEFOREEND);
    };

  }

  _renderBlankList() {
    // Метод для рендеринга заглушки
    render(this._tripContainer, this._blankListComponent, RenderPosition.BEFOREEND);
  }

  _renderEventList() {
    // Рендер контейнера списка событий
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEventContent() {
    // Метод для инициализации (начала работы) модуля,
    if (this._points.length === 0) {
      this._renderBlankList();
      return
    }

    this._renderSort();
    this._renderEventList();
    this._renderEvents();
  }
}
