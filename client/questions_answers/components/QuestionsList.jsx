import React from 'react';
import Question from './Question.jsx';

const QuestionsList = (props) => (
  <div className="questions-list container">
    {props.questions.map((question) => <Question key={question.question_id} question={question.question_body} answers={question.answers} question_id={question.question_id}/>)}
  </div>

);

export default QuestionsList;