const POINT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateDestanation = () => {
  const MAX_PHOTO_COUNT = 5;

  const generatePhoto = () => {
    return (
      {
        src: `http://picsum.photos/300/150?r=${Math.random()}`,
        description: `Cool photo description`
      }
    )
  };

  const DESCRIPTIONS = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligulafeugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullamnunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibhvitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctusnunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nuncfermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const NAMES = [
    `Prague`,
    `Minsk`,
    `Brest`,
    `Los Santos`,
    `Munich`,
    `Riga`
  ];

  let description=``;
  const descriptionSentencesCount=getRandomInteger(1,3)
  for (let i=0; i<descriptionSentencesCount;i++) {
    description = i == 0 ? DESCRIPTIONS[i] : `${description} ${DESCRIPTIONS[getRandomInteger(0,DESCRIPTIONS.length-1)]}`;
  }
  return ({
    description,
    name: NAMES[getRandomInteger(0,NAMES.length-1)],
    pictures: new Array(getRandomInteger(0,MAX_PHOTO_COUNT)).fill().map(generatePhoto)
  })
};

const generateOffer = (value,offerIndex) => {
  const OFFER_TITLES = [
    `Upgrade to a business class`,
    `Choose the radio station`,
    `Switch to comfort class`,
    `Add luggage`,
    `Travel by train`,
    `Choose seats`,
    `Add breakfast`,
    `Lunch in city`
  ];

  const generateOfferData = () => {
    return ({
      title: OFFER_TITLES[getRandomInteger(0,OFFER_TITLES.length-1)],
      price: getRandomInteger(0,40)*5
    });
  }

  const MAX_OFFER_DATA_COUNT = 4;

  return ({
    type: POINT_TYPES[offerIndex],
    offers: new Array(getRandomInteger(0,MAX_OFFER_DATA_COUNT)).fill().map(generateOfferData)
  });
};

export const generateOffers = () => {

  const offers = new Array(POINT_TYPES.length-1).fill().map(generateOffer)
  console.log(offers);
  return offers;
}

import {offers} from '../main.js';

//const offers = generateOffers();

const generatePoint = (initDate=0) => {

  const EVENT_MINUTES_MAX_DELAY = 60*24;

  const type = POINT_TYPES[getRandomInteger(0,POINT_TYPES.length-1)];
  const pointTypeOffers = offers.find(item => (item.type == type));
  const pointOffers = pointTypeOffers ? pointTypeOffers.offers.filter(item => getRandomInteger(0,1)===1) : [];

  let date_from = new Date(initDate);
  date_from.setMinutes(date_from.getMinutes()+getRandomInteger(0,EVENT_MINUTES_MAX_DELAY));
  let date_to = new Date(date_from);
  date_to.setMinutes(date_from.getMinutes()+getRandomInteger(0,EVENT_MINUTES_MAX_DELAY));

  const point = {
    base_price: getRandomInteger(1,200)*5,
    destination: generateDestanation(),
    type,
    offers: pointOffers,
    date_from,
    date_to
  }
  console.log(point);
  return point;

}

const MAX_POINT_COUNT = 10;
const MIN_POINT_COUNT = 3;

export const generatePoints = () => {
  const START_TRIP_HOURS_GAP = 100;
  let points = [];
  const pointsCount= getRandomInteger(MIN_POINT_COUNT,MAX_POINT_COUNT);
  let initDate=new Date();
  initDate.setHours(initDate.getHours() + getRandomInteger(-START_TRIP_HOURS_GAP, START_TRIP_HOURS_GAP));
  for(let i=0; i< pointsCount; i++) {
    points[i]= generatePoint(initDate);
    initDate = points[i].date_to;
  }

}


