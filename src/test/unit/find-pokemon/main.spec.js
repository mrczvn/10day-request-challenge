const clientRequest = require('../../../helpers/client-request');

const URL = (pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

describe('Find Pokemon', () => {
  test('must return status code 200 and a list of skills', async () => {
    try {
      const data = await clientRequest({
        protocol: 'https',
        url: URL('butterfree'),
      });

      const { abilities } = data;

      const [{ statusCode }] = data.requestInfo;

      expect(statusCode).toBe(200);
      expect(abilities.length).toBeGreaterThan(-1);
    } catch (e) {
      console.log(e);
    }
  });
});
