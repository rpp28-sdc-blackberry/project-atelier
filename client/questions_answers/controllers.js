import $ from 'jquery';

const getNextQuestionsAndAnswers = (product_id, count, page) => {

  return $.ajax({
    url: `http://localhost:8080/qa/questions?product_id=${product_id}&count=${count}&page=${page}`,
    method: 'GET'
  });

};

export default getNextQuestionsAndAnswers;