const clientRequest = require('../../../helpers/client-request');

const URL = () => `https://api.punkapi.com/v2/beers`;

describe('Find beers', () => {
  test('must return status code 200 and a list of beers', async () => {
    const data = await clientRequest({ protocol: 'https', url: URL() });

    const [{ statusCode }] = data.requestInfo;

    expect(statusCode).toBe(200);
    expect(data.length).toBeGreaterThan(-1);
  });
});
