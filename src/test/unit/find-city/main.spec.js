const clientRequest = require('../../../helpers/client-request');

const URL = (city) => `https://api.teleport.org/api/cities/?search=${city}`;

describe('Find City', () => {
  test('must return status code 200 and a valid city', async () => {
    const data = await clientRequest({ protocol: 'https', url: URL('osasco') });

    const [{ statusCode }] = data.requestInfo;

    const city = data._embedded['city:search-results'];

    expect(statusCode).toBe(200);
    expect(city.length).toBeGreaterThan(-1);
  });
});
