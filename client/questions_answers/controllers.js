import $ from 'jquery';
import TOKEN from '../../config.js';


// THESE FUNCTIONS WILL BE REFACTORED TO MAKE ALL REQUESTS TO THE SERVER INSTEAD OF THE API

const getNextQuestionsAndAnswers = (count, page) => {

  return $.ajax({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=22124&count=${count}&page=${page}`,
    method: 'GET',
    headers: {'Authorization': TOKEN}
  });

};

export default getNextQuestionsAndAnswers;