const clientRequest = require('../../../helpers/client-request');

const URL = (recipe) => `http://www.recipepuppy.com/api/?q=${recipe}`;

describe('Find recipes', () => {
  test('must return status code 200 and valid recipes', async () => {
    const data = await clientRequest({ protocol: 'http', url: URL('omelete') });

    const { results } = data;

    const [{ statusCode }] = data.requestInfo;

    expect(statusCode).toBe(200);
    expect(results.length).toBeGreaterThan(-1);
  });
});
