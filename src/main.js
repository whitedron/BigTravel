import SiteMenu from './components/main-menu.js';
import MainFilter from './components/filter.js';
import TripInfo from './components/trip-info.js';
import {generateOffers, generatePoints} from './mock/point';
import {render, RenderPosition} from './utils/render.js';
import TripController from './contollers/trip-controller.js';

export const offers = generateOffers();
const points = generatePoints();

const tripHeaderElement = document.querySelector(`.trip-main`);
render(tripHeaderElement, new TripInfo(points), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripHeaderElement.querySelector(`.trip-main__trip-controls `);
render(tripControlsElement, new SiteMenu(), RenderPosition.AFTER, tripControlsElement.querySelector(`h2`));

render(tripControlsElement, new MainFilter(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const tripController = new TripController(tripEventsElement);
tripController.init(points, offers);

