const readline = require('readline');
const clientRequest = require('../helpers/client-request');

const URL = (symbols = '') =>
  `http://data.fixer.io/api/latest?access_key=1ed419fd2c940e3f1e9339e3f1bdae99${symbols}`;

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const result = async (url) => {
  try {
    const data = await clientRequest({ protocol: 'http', url });

    const { base } = data;
    const { date } = data;

    const rates = Object.keys(data.rates);
    const values = Object.values(data.rates);

    console.log(`\n
    Cotação das moedas internacionais de acordo com o ${base} - Data: ${date} \n`);

    rates.forEach((c, i) =>
      console.log(`Moeda: ${c} - Cotação: ${values[i]} \n`)
    );
  } catch (e) {
    console.error(e);
  }
};

const question = () => {
  const rl = readlineInterface();

  rl.question(
    'Deseja pegar a cotações de moedas internacionais especifícas de acordo com o euro ? (s/n) \n',
    (ans) => {
      if (ans.toLowerCase().trim() === 's') {
        rl.setPrompt(
          'Insira os códigos das moedas de três letras separadas por vírgula: \n'
        );

        rl.prompt();

        rl.on('line', (c) => {
          rl.close();

          const codes = c.split(',');

          const listCodes = codes
            .reduce((acc, r) => acc.concat(`,${r.trim()}`))
            .trim()
            .toUpperCase();

          console.log('Coletando as cotações...');

          result(URL(`&symbols=${listCodes}`)).then();
        });
      } else if (ans.toLowerCase().trim() === 'n') {
        rl.close();

        console.log('Coletando as cotações...');

        result(URL()).then();
      } else {
        rl.close();
      }
    }
  );
};

question();
