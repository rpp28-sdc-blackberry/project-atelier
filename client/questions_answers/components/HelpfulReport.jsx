import React from 'react';

const HelpfulReport = (props) => {

  let renderReportedLink, renderHelpfulLink;
  let helpfulIds = JSON.parse(localStorage.getItem(props.content_type === 'question' ? 'helpfulQuestions' : 'helpfulAnswers'));

  if (props.reported) {
    renderReportedLink = (<span> Reported </span>);
  } else {
    renderReportedLink = (<button onClick={props.handleReportButtonClick}> Report </button>);
  }

  if (helpfulIds.includes(props.content_id)) {
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