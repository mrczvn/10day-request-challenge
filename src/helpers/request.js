const request = ({ protocol }) => (url) => {
  return new Promise((resolve, reject) => {
    const req = protocol.get(url, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`));
      }

      const data = [];

      res
        .on('data', (chunk) => data.push(chunk))
        .on('end', () => {
          const parseJson = JSON.parse(Buffer.concat(data).toString());

          const requestInfo = [{ statusCode: res.statusCode }];

          const requestComplete = Object.assign(parseJson, { requestInfo });

          resolve(requestComplete);
        });
    });

    req.on('error', reject);
    req.end();
  });
};

module.exports = request;
