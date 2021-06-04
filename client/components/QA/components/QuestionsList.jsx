import React from 'react';
import QAItem from './QAItem.jsx';

const QuestionsList = (props) => (
  <div className="questions-list container">
    {props.questions.map((question) => <QAItem key={question.question_id} question={question.question_body} answers={question.answers}/>)}
  </div>

);

export default QuestionsList;