import SiteMenu from './components/main-menu.js';
import MainFilter from './components/filter.js';
import EventSort from './components/sort.js';
import EventList from './components/list.js';
import BlankList from './components/blank-list.js';
import TripInfo from './components/trip-info.js';
import TripDay from './components/day-event-list.js';
import Event from './components/event.js';
import EditEvent from './components/event-edit.js';

export default class TripController {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._eventSortComponent = new EventSort();
    this._eventListComponent = new EventList();
    this._tripDayComponent = new TripDay();
    this._blankListComponent = new BlankList();
  }

  init(points) {
    this._points = points.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderEvents() {
    // Метод для рендеринга N-задач за раз
  }

  _renserTripDay() {


  }

  _renderBlankList() {
    // Метод для рендеринга заглушки
  }

  _renderEventList() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
