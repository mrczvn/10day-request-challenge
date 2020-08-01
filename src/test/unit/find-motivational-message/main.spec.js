const clientRequest = require('../../../helpers/client-request');

const URL = () =>
  'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand';

describe('Find motivational messages', () => {
  test('must return status code 200 and valid messages', async () => {
    const data = await clientRequest({ protocol: 'https', url: URL() });

    const [{ statusCode }] = data.requestInfo;

    expect(statusCode).toBe(200);
    expect(data.length).toBeGreaterThan(-1);
  });
});
