const readline = require('readline');
const clientRequest = require('../helpers/client-request');

const URL = (n) => `https://launchlibrary.net/1.4/launch/next/${n}`;

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const question = () => {
  const rl = readlineInterface();
  rl.question(
    'Insira a quantidade de lançamentos futuros você deseja: \n',
    async (ans) => {
      rl.close();

      const data = await clientRequest({ protocol: 'https', url: URL(ans) });

      const { launches } = data;

      launches.forEach((l) => {
        console.log(`\n
        Missão: ${l.name} \n
        Abertura da janela para lançamento: ${l.windowstart} \n
        Fechamento da janela para lançamento: ${l.windowend}
        \n`);
      });
    }
  );
};

question();
