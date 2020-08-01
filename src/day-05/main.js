const readline = require('readline');
const clientRequest = require('../helpers/client-request');

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const URL = ({ isoCode, date }) =>
  `http://api.worldbank.org/v2/pt/country/${isoCode}?date=${date}&format=json`;

const question = () => {
  const rl = readlineInterface();

  rl.question(
    'Insira o código do país a ser verificado (ISO 3166-1 alpha-2 code): \n',
    (isoCode) => {
      rl.setPrompt('Insira o ano do país a ser verificado: \n');

      rl.prompt();

      rl.on('line', async (date) => {
        rl.close();

        try {
          const [, data] = await clientRequest({
            protocol: 'http',
            url: URL({
              isoCode: isoCode.toLowerCase().trim(),
              date: date.toLowerCase().trim(),
            }),
          });

          if (!data) {
            console.log('\n País não encontrado...');
            return process.exit();
          }

          const [country] = data;

          const { name, region, incomeLevel } = country;

          console.log(
            `\n Nome do País: ${name} \n Região: ${region.value} \n Nível de renda: ${incomeLevel.value}`
          );
        } catch (e) {
          console.error(e);
        }
      });
    }
  );
};

question();
