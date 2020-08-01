const clientRequest = require('../../../helpers/client-request');

const URL = (n) => `https://launchlibrary.net/1.4/launch/next/${n}`;

describe('Find launches', () => {
  test('must return status code 200 and a list of launches', async () => {
    const data = await clientRequest({ protocol: 'https', url: URL(1) });

    const { launches } = data;

    const [{ statusCode }] = data.requestInfo;

    expect(statusCode).toBe(200);
    expect(launches.length).toBeGreaterThan(-1);
  });
});
