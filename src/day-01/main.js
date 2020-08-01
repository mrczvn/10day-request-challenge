const readline = require('readline');
const clientRequest = require('../helpers/client-request');

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const URL = (city) => `https://api.teleport.org/api/cities/?search=${city}`;

const question = () => {
  const rl = readlineInterface();

  rl.question(
    'Entre com o nome (ou parte do nome) da cidade: \n',
    async (c) => {
      rl.close();

      try {
        const data = await clientRequest({
          protocol: 'https',
          url: URL(c.toLowerCase().trim()),
        });

        const city = data._embedded['city:search-results'];

        console.log(`A sua busca retornou [${city.length}] resultados: \n`);

        city.forEach((c) => console.log(c.matching_full_name));
      } catch (e) {
        console.error(e);
      }
    }
  );
};

question();
