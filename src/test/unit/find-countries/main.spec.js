const clientRequest = require('../../../helpers/client-request');

const URL = ({ isoCode, date }) => {
  return `http://api.worldbank.org/v2/pt/country/${isoCode}?date=${date}&format=json`;
};

describe('Find countries', () => {
  test('must return status code 200 and country total', async () => {
    const data = await clientRequest({
      protocol: 'http',
      url: URL({ isoCode: 'br', date: 2006 }),
    });

    const [{ total }] = data;

    const [{ statusCode }] = data['requestInfo'];

    expect(statusCode).toBe(200);
    expect(total).toBe(1);
  });
});
