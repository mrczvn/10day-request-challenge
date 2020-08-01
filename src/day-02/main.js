const clientRequest = require('../helpers/client-request');

const URL = () => 'http://api.icndb.com/jokes/random';

const result = async ({ protocol, url }) => {
  try {
    const data = await clientRequest({ protocol, url });

    console.log(`\n ${data.value.joke}`);
  } catch (e) {
    console.error(e);
  }
};

result({ protocol: 'http', url: URL() });
