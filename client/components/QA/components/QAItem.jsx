import React from 'react';
import AnswersList from './AnswersList.jsx';

const QAItem = (props) => (

  <div className="qa-item">
    <b> {`Q: ${props.question}`} </b>
    <AnswersList answers={props.answers}/>
  </div>

);

export default QAItem;