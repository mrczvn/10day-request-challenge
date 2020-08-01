const readline = require('readline');
const clientRequest = require('../helpers/client-request');

const URL = (pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const question = () => {
  const rl = readlineInterface();

  rl.question(
    'Para buscar informações sobre um Pokémon, forneça um ID de 0 a 720 ou seu nome: \n',
    async (pk) => {
      rl.close();
      try {
        const data = await clientRequest({ protocol: 'https', url: URL(pk) });

        if (!data) {
          console.log('Nenhum pokemon encontrado...');
          return process.exit();
        }

        const { abilities } = data;

        const ability = abilities.map((a) => a.ability.name);

        const [{ name }] = data.forms;

        console.log(
          `\n A sua busca retornou o "${name}" com as seguintes habilidades: \n`
        );

        ability.forEach((a) => console.log(`${a} \n`));
      } catch (e) {
        console.error(e);
      }
    }
  );
};

question();
