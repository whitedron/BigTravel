export const createTripInfoTemplate = (points) => {

  const getFormattedDate = (date) => {
    const day = date.getDate()<10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = (date.getMonth()+1)<10 ? `0${(date.getMonth()+1)}` : `${(date.getMonth()+1)}`;
    const year = `${date.getFullYear()}`;
    const textMonth = date.toLocaleString(`en`, {
      month: `short`
    });
   return {
     day,
     month,
     year,
     textMonth
   };
  };

  const mainPrice = points.reduce((sum, current) => sum + current.base_price +
    current.offers.reduce((sumOffers, currentOffer) => sumOffers + currentOffer.price, 0), 0);
  const firstDay = points[0].date_from;
  const lastDay = points[points.length-1].date_to;
  let tripDates = ``;
  if (getFormattedDate(firstDay).year === getFormattedDate(lastDay).year && getFormattedDate(firstDay).month === getFormattedDate(lastDay).month) {
    tripDates = `${getFormattedDate(firstDay).textMonth} ${getFormattedDate(firstDay).day}&nbsp;&mdash;&nbsp;${getFormattedDate(lastDay).day}`;
  } else {
    if (getFormattedDate(firstDay).year === getFormattedDate(lastDay).year) {
      tripDates = `${getFormattedDate(firstDay).textMonth} ${getFormattedDate(firstDay).day}&nbsp;&mdash;&nbsp;${getFormattedDate(lastDay).textMonth} ${getFormattedDate(lastDay).day}`;
    } else {
      tripDates = `${getFormattedDate(firstDay).year} ${getFormattedDate(firstDay).textMonth} ${getFormattedDate(firstDay).day}&nbsp;&mdash;&nbsp;${getFormattedDate(lastDay).year} ${getFormattedDate(lastDay).textMonth} ${getFormattedDate(lastDay).day}`;
    }
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">${tripDates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${mainPrice}</span>
      </p>
    </section>`
  );
};
