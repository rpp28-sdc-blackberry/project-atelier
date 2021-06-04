import React from 'react';

const formatDate = (rawDate) => {

  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  let formattedDate = rawDate.slice(0, 10).split('-');

  return `${months[formattedDate[1]]} ${formattedDate[2][0] === '0' ? formattedDate[2][1] : formattedDate[2] }, ${formattedDate[0]}`;

};

const Answer = (props) => (
  <div className="answer">
    <div>
      {props.answer.body}
    </div>
    <div>
      <span> by {props.answer.answerer_name},</span>
      {console.log(props.answer.date)}
      <span> {formatDate(props.answer.date)} </span>
    </div>
  </div>
);

export default Answer;