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

  const descriptions = [
    `the best city ever`,
    `Germany style`,
    `sweet place`,
    `chipped and very delishious`
  ];
  const names = [
    `Prague`,
    `Minsk`,
    `Brest`,
    `Los Santos`,
    `Munich`,
    `Riga`
  ];

  return ({
    description: descriptions[getRandomInteger(0,descriptions.length-1)],
    name: names[getRandomInteger(0,names.length-1)],
    pictures: new Array(getRandomInteger(0,MAX_PHOTO_COUNT)).fill().map(generatePhoto)
  })
}
