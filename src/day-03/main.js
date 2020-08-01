const clientRequest = require('../helpers/client-request');

const URL = () =>
  'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand';

const getContent = (array) => array.map((el) => el.content.rendered);

const getTitle = (array) => array.map((el) => el.title.rendered);

const removeSymbols = (symbols) => (array) =>
  array.map((el) =>
    symbols.reduce((acc, symbol) => acc.split(symbol).join(''), el)
  );

const symbols = ['<p>', '<br />', '</p>', '\n'];

const result = async ({ protocol, url }) => {
  try {
    const data = await clientRequest({ protocol, url });

    const content = getContent(data);

    const title = getTitle(data);

    const filteredContent = removeSymbols(symbols);

    const newFilteredContent = filteredContent(content);

    data.forEach((_, i) => {
      console.log(
        `Título: \n ${title[i]} - Conteúdo: ${newFilteredContent[i]} \n`
      );
    });
  } catch (e) {
    console.error(e);
  }
};

result({ protocol: 'https', url: URL() });
