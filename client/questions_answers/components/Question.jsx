import React from 'react';
import AnswersList from './AnswersList.jsx';

const Question = (props) => (

  <div className="qa-item">
    <b> {`Q: ${props.question}`} </b>
    <button onClick={() => console.log(props.question_id)}> Add Answer </button>
    <AnswersList answers={props.answers}/>
  </div>

);

export default Question;