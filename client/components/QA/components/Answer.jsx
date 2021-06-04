import React from 'react';

const Answer = (props) => (
  <div className="answer">
    <div>
      {props.answer.body}
    </div>
    <div>
      <span> by {props.answer.answerer_name},</span>
      <span> {props.answer.date}</span>
    </div>
  </div>
);

export default Answer;