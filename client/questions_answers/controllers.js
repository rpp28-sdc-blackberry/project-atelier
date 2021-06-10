import $ from 'jquery';

const fetchQuestions = (product_id, count, page) => {

  return $.ajax({
    url: `http://localhost:8080/qa/questions?product_id=${product_id}&count=${count}&page=${page}`,
    method: 'GET'
  });

};

const submitQuestion = (question, nickname, email, product_id) => {

  return $.ajax({
    url: `http://localhost:8080/qa/questions`,
    method: 'POST',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      body: question,
      name: nickname,
      email: email,
      product_id: Number(product_id)
    })
  });

};
const submitAnswer = (answer, nickname, email, question_id) => {

  return $.ajax({
    url: `http://localhost:8080/qa/questions/${question_id}/answers`
    method: 'POST',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      body: answer,
      name: nickname,
      email: email,
      photos: []
    })
  });

};

export { fetchQuestions, submitQuestion, submitAnswer };