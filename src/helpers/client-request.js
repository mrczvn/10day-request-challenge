const http = require('http');
const https = require('https');

const request = require('./request');

const clientRequest = ({ protocol, url }) => {
  return {
    http: request({ protocol: http }),
    https: request({ protocol: https }),
  }[protocol](url);
};

module.exports = clientRequest;
