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
    `the best city ever`,
    `Germany style`,
    `sweet place`,
    `chipped and very delishious`
  ];
  const NAMES = [
    `Prague`,
    `Minsk`,
    `Brest`,
    `Los Santos`,
    `Munich`,
    `Riga`
  ];

  return ({
    description: DESCRIPTIONS[getRandomInteger(0,DESCRIPTIONS.length-1)],
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

//import {offers} from '../main.js';

const generatePoint = () => {
  const type = POINT_TYPES[getRandomInteger(0,POINT_TYPES.length-1)];
  const pointTypeOffers = offers.find(item => (item.type == type));
  const pointOffers = pointTypeOffers.offers.filter(item => getRandomInteger(0,1)===1);
  const point = {
    base_price: getRandomInteger(1,200)*5,
    destination: generateDestanation(),
    type,
    offers: pointOffers
  }
  console.log(point);
  return point;

}

const offers = generateOffers();
generatePoint();
generatePoint();
