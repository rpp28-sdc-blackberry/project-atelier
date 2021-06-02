import React from 'react';
import QAItem from './QAItem.jsx';

const QAContainer = (props) => (
  <div className="qa-container">
    {props.questions.map((question) => <QAItem key={question.question_id} question={question.question_body}/>)}
  </div>

);

export default QAContainer;