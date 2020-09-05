export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`
};

export const renderElement = (container, element, place, reference) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTER:
      container.insertBefore(element, reference.nextSibling);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const getDateComponents = (date) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  const month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : `${(date.getMonth() + 1)}`;
  const year = `${date.getFullYear()}`;
  const textMonth = date.toLocaleString(`en`, {
    month: `short`
  });
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  return {
    day,
    month,
    year,
    textMonth,
    hours,
    minutes
  };
};

export const getDatesDifference = (dateFrom = 0, dateTo = 0) => {
  const differenceInMinutes = Math.floor(dateTo / (60 * 1000)) - Math.floor(dateFrom / (60 * 1000));
  const differenceMinutes = differenceInMinutes % 60 < 10 ? `0${differenceInMinutes % 60}M` : `${differenceInMinutes % 60}M`;
  const differenceHours = (Math.floor(differenceInMinutes / 60)) % 24 < 10 ? `0${Math.floor((differenceInMinutes / 60)) % 24}H` : `${Math.floor((differenceInMinutes / 60)) % 24}H`;
  const differenceDays = Math.floor(differenceInMinutes / (60 * 24)) < 10 ? `0${Math.floor(differenceInMinutes / (60 * 24))}D` : `${Math.floor(differenceInMinutes / (60 * 24))}D`;

  if (differenceInMinutes < 0) {
    return `error`; // ошибка дат
  }
  if (differenceInMinutes < 60) {
    return `${differenceMinutes}`; // до часа
  }
  if (differenceInMinutes < 60 * 24) {
    return `${differenceHours} ${differenceMinutes}`; // до суток
  }
  return `${differenceDays} ${differenceHours} ${differenceMinutes}`;
};

export const writeAction = (type) => {
  const MOVEMENTS = new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`]);
  const action = MOVEMENTS.has(type) ? `${type} to` : `${type} in`;
  return `${action.charAt(0).toUpperCase()}${action.slice(1)}`;
}
