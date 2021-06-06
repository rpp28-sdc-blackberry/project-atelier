import React from 'react';
import Question from './Question.jsx';

const QuestionsList = (props) => (
  <div className="questions-list container">
    {props.questions.map((question) => <Question key={question.question_id} question={question.question_body} answers={question.answers}/>)}
  </div>

);

export default QuestionsList;