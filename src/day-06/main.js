const readline = require('readline');
const clientRequest = require('../helpers/client-request');

const URL = (recipe) => `http://www.recipepuppy.com/api/?q=${recipe}`;

const readlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const question = () => {
  const rl = readlineInterface();

  rl.question('Type in a recipe to search for: \n', async (ans) => {
    rl.close();

    const data = await clientRequest({
      protocol: 'http',
      url: URL(ans.toLowerCase().trim()),
    });

    if (!data) {
      console.log('Nenhuma receita encontrada...');
      return process.exit();
    }

    const { results } = data;

    results.forEach((rec) => {
      console.log(
        `Recipe : ${rec.title} \n Ingredients: ${rec.ingredients} \n`
      );
    });
  });
};

question();
