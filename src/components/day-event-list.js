import {getDateComponents} from '../utils.js';
import AbstractComponent from './Abstract.js';

const createDayListTemplate = (date, tripDay) => {

  const parsedDate = getDateComponents(date);

  return (
    `<li class="trip-days__item  day">
       <div class="day__info">
          <span class="day__counter">${tripDay}</span>
          <time class="day__date" datetime="${parsedDate.year}-${parsedDate.month}-${parsedDate.day}">
          ${parsedDate.textMonth} ${parsedDate.day}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>
`);
};

export default class TripDay extends AbstractComponent {
  constructor(date, dayNumber) {
    super();
    this._date = date;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return createDayListTemplate(this._date, this._dayNumber);
  }

}
