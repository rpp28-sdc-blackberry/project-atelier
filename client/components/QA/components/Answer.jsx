import React from 'react';
import { formatAnswererName, formatDate } from '../helpers.js';

const Answer = (props) => {

  const { answerer_name, date, body } = props.answer;

  return (

    <div className="answer">
      <div>
        {body}
      </div>
      <div>
        <span> by {formatAnswererName(answerer_name)}, {formatDate(date)} </span>
      </div>
    </div>

  );

};

export default Answer;