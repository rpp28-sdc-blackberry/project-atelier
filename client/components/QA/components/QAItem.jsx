import React from 'react';
import AnswersList from './AnswersList.jsx';

const QAItem = (props) => (

  <div>
    <div>
      <b> {`Q: ${props.question}`} </b>
      <AnswersList answers={props.answers}/>
    </div>
  </div>

);

export default QAItem;