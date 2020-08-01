const readline = require('readline');
const clientRequest = require('../helpers/client-request');

String.prototype.equalsIgnoreCase = function (compareString) {
  return this.toUpperCase() === compareString.toUpperCase();
};

const baseURL = 'https://parallelum.com.br/fipe/api/v1';

const URLS = {
  brands: () => `${baseURL}/carros/marcas`,
  brand: (brand) => `${baseURL}/carros/marcas/${brand}/modelos`,
  model: ({ brand, model }) =>
    `${baseURL}/carros/marcas/${brand}/modelos/${model}/anos`,
};

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const question = () => {
  const rl = readlineInterface();

  rl.question('Informe a marca do carro: \n', async (ans) => {
    if (!ans) rl.close();
    try {
      const brands = await clientRequest({
        protocol: 'https',
        url: URLS['brands'](),
      });

      const brand = brands.filter((b) => b.nome.equalsIgnoreCase(ans));

      if (![brand]) {
        console.log('Nenhuma marca encontrada...');

        return process.exit();
      }

      const [{ codigo }] = brand;
      const [{ nome }] = brand;

      const { modelos } = await clientRequest({
        protocol: 'https',
        url: URLS['brand'](codigo),
      });

      console.log(` \n Lista de carros da marca ${nome}: `);

      modelos.forEach((m) => {
        console.table(m);
      });

      process.exit();
    } catch (e) {
      console.error(e);
    }
  });
};

question();
