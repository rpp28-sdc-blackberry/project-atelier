import $ from 'jquery';
import TOKEN from '../../../config.js';

const getNextTwoQuestionsAndAnswers = (page) => {

  return $.ajax({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=22124&count=2&page=${page}`,
    method: 'GET',
    headers: {'Authorization': TOKEN}
  });

};

export default getNextTwoQuestionsAndAnswers;