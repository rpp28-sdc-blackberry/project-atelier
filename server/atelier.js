const axios = require('axios');
require('dotenv').config();

const queryAPI = (method, url, body) => {
  console.log('URL', url, method, body);
  let ipAddress = 'http://';
  if (url.includes('reviews')) {
    ipAddress += `3.208.116.238:3000`;
  } else if (url.includes('qa/answers') || url.includes('qa/questions')) {
    ipAddress += `52.72.220.199`;
  } else {
    ipAddress += `54.157.143.96`;
  }

  return axios({
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    },
    method: method,
    url: `${ipAddress}${url}`,
    data: body
  });

};

module.exports = queryAPI;