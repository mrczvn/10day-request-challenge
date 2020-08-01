const clientRequest = require('../../../helpers/client-request');

const URL = (brand) =>
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`;

describe('Find cars', () => {
  test('must return status code 200 and list of brands', async () => {
    const data = await clientRequest({ protocol: 'https', url: URL(7) });

    const { modelos } = data;

    const [{ statusCode }] = data.requestInfo;

    expect(statusCode).toBe(200);
    expect(modelos.length).toBeGreaterThan(-1);
  });
});
