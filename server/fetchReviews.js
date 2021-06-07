const axios = require('axios');
const config = require('../config.js');

const fetchReviews = (query, callback) => {
  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=${query.product_id}`,
    headers: { Authorization: config.TOKEN }
  };
  axios(options)
    .then((response) => {
      console.log('Received response!');
      callback(null, response.data);
    })
    .catch((error) => {
      console.log('Failed to receive response!');
      callback(error, null);
    });
};

module.exports.fetchReviews = fetchReviews;