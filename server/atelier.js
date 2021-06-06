const axios = require('axios');
const TOKEN = require('../config.js');

const queryAPI = (method, url, body) => {

  if (method === 'GET') {

    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}`, {
      headers: {
        Authorization: TOKEN
      }
    });

  }
};

module.exports = queryAPI;