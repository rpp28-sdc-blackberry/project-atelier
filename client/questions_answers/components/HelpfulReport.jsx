import React from 'react';

const HelpfulReport = (props) => {

  let renderReportedLink, renderHelpfulLink;

  if (props.reported) {
    renderReportedLink = (<span> Reported </span>);
  } else {
    renderReportedLink = (<button onClick={props.handleReportButtonClick}> Report </button>);
  }

  let helpfulQuestions = JSON.parse(localStorage.getItem('helpfulQuestions'));

  if (helpfulQuestions.includes(props.content_id)) {
    renderHelpfulLink = (<span> {`Helpful? Yes ${props.helpfulness}`}</span>);
  } else {
    renderHelpfulLink = (<span>
      <span> Helpful? </span>
      <button onClick={props.handleHelpfulButtonClick}> {`Yes ${props.helpfulness}`} </button>
    </span>);
  }

  return (
    <span>
      {renderHelpfulLink}
      {renderReportedLink}
    </span>
  );

};


export default HelpfulReport;