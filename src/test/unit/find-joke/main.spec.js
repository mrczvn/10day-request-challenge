const clientRequest = require('../../../helpers/client-request');

const URL = () => `http://api.icndb.com/jokes/random`;

describe('Find Joke', () => {
  test('must return status code 200 and a valid joke', async () => {
    const data = await clientRequest({ protocol: 'http', url: URL() });

    const [{ statusCode }] = data.requestInfo;

    const { type } = data;

    expect(type).toBe('success');
    expect(statusCode).toBe(200);
  });
});
