const axios = require('axios');
//const TOKEN = require('../config.js');
require('dotenv').config();

const queryAPI = (method, url, body) => {

  return axios({
    headers: {
      Authorization: process.env.TOKEN
    },
    method: method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}`,
    data: body
  });

};

module.exports = queryAPI;