const axios = require('axios');
const config = require('../../config.js');

const fetchReviews = (query, callback) => {
  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=${query.product_id}&page=${query.page}&count=${query.count}&sort=${query.sort}`,
    headers: { Authorization: config.TOKEN }
  };
  axios(options)
    .then((reviews) => {
      console.log('reviews data:', reviews.data);
      callback(null, reviews.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

module.exports = {
  fetchReviews: fetchReviews
};