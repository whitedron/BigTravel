import EventSort from '../components/sort.js';
import EventList from '../components/list.js';
import BlankList from '../components/blank-list.js';
import TripDay from '../components/day-event-list.js';
import Event from '../components/event.js';
import EditEvent from '../components/event-edit.js';
import {render, RenderPosition, remove, replace, SortType} from '../utils/render.js';
import {getDateComponents, sortByTime, sortByPrice} from '../utils/common.js';

export default class TripController {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;

    this._eventSortComponent = new EventSort();
    this._eventListComponent = new EventList();
    this._blankListComponent = new BlankList();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
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

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    // - Очищаем список
    this._clearEventList();
    // - Рендерим список заново

    this._renderTripDays();

    this._renderEvents();
  }

  _clearEventList() {
    this._eventListComponent.getElement().innerHTML = ``;
  }

  _sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _points
    switch (sortType) {
      case SortType.TIME:
        this._points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._points.sort(sortByPrice);
        break;
      case SortType.EVENT:
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _points исходный массив
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._eventSortComponent, RenderPosition.BEFOREEND);
    this._eventSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
      this._renderEvent(point);
    });
  }

  _renderTripDays() {
    // Метод для рендеринга всех контейнеров дней
    this._points.forEach((point) => {
      this._renderTripDay(point);
    });
  }

  _getCurrentEventDataContainer(currentDate) {
    // вспомогательная функция поиска уже созданного контейнера событий дня
    const day = getDateComponents(currentDate).day;
    const month = getDateComponents(currentDate).month;
    const year = getDateComponents(currentDate).year;

    const desiredDay = this._currentSortType === SortType.EVENT ?
    `.day__date[datetime="${year}-${month}-${day}"]` :
    `.trip-days__item`

    const currentEventDateContainer = this._eventListComponent.getElement().querySelector(desiredDay);

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
     // const tripDaysCount = Math.floor((currentDate - this._firstTripDay) / (60 * 24 * 60 * 1000));
      const tripDaysCount = this._currentSortType === SortType.EVENT ?
      Math.floor((currentDate - this._firstTripDay) / (60 * 24 * 60 * 1000))+1
      :0;
      const tripDayComponent = new TripDay(currentDate, tripDaysCount);
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
    this._renderTripDays();
    this._renderEvents();
  }
}
