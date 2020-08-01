const clientRequest = require('../helpers/client-request');

const URL = () => `https://api.punkapi.com/v2/beers`;

const getName = (beer) => beer.name;

const result = async ({ protocol, url }) => {
  try {
    const data = await clientRequest({ protocol, url });

    const beerName = data.map(getName);

    console.log(`Cervejas disponiveis em estoque: [${data.length}] \n`);

    beerName.forEach((b) => console.log(`${b} \n`));
  } catch (e) {
    console.error(e);
  }
};

result({ protocol: 'https', url: URL() });
