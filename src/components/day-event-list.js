export const createDayListTemplate = (date, tripDay) => {
  const day = date.getDate()<10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = (date.getMonth()+1)<10 ? `0${(date.getMonth()+1)}` : `${(date.getMonth()+1)}`;
  const year = `${date.getFullYear()}`;
  const textMonth = date.toLocaleString(`en`, {
    month: `short`
  });

  return (`
    <li class="trip-days__item  day">
       <div class="day__info">
          <span class="day__counter">${tripDay}</span>
          <time class="day__date" datetime="${year}-${month}-${day}">${textMonth} ${day}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>
`);
};
