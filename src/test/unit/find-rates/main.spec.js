const clientRequest = require('../../../helpers/client-request');

const URL = (symbols = '') =>
  `http://data.fixer.io/api/latest?access_key=1ed419fd2c940e3f1e9339e3f1bdae99${symbols}`;

describe('Find rates', () => {
  test('must return status code 200 and a list of rates', async () => {
    const data = await clientRequest({ protocol: 'http', url: URL() });

    const { success } = data;

    const [{ statusCode }] = data.requestInfo;

    expect(statusCode).toBe(200);
    expect(success).toBe(true);
  });
});
