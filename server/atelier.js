const axios = require('axios');
const env = require('dotenv').config();
// const TOKEN = require('../config.js');

const queryAPI = (method, url, body) => {

  return axios({
    headers: {
      Authorization: env.GITHUB_TOKEN
    },
    method: method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}`,
    data: body
  });

};

module.exports = queryAPI;