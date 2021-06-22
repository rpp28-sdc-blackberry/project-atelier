import React from 'react';

const HelpfulReport = (props) => {

  let renderReportedLink, renderHelpfulLink;
  let helpfulIds = JSON.parse(localStorage.getItem(props.content_type === 'question' ? 'helpfulQuestions' : 'helpfulAnswers'));

  if (props.reported) {
    renderReportedLink = (<span> <i>Reported</i> | </span>);
  } else {
    renderReportedLink = ( <span>
      <button
        className="qa-button-link" onClick={props.handleReportButtonClick}> Report </button>
    </span>
    );
  }

  if (helpfulIds.includes(props.content_id)) {
    renderHelpfulLink = (<span> {'Helpful?'} <i>Yes</i> {`(${props.helpfulness}) | `}</span>);
  } else {
    renderHelpfulLink = (<span>
      <span> Helpful? </span>
      <button className="qa-button-link" onClick={props.handleHelpfulButtonClick}> Yes </button>
      <span> {`(${props.helpfulness}) | `} </span>
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