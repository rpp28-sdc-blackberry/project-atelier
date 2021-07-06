import React from 'react';

const RatingBreakdownBar = (props) => {
  return (
    <div onClick={() => props.handleRatingBreakdownClick(props.star)} class='review-breakdown-bar review-clickable'>
      <span>{props.star} stars:</span>
      <span><progress max="100" value={props.percentage}></progress></span>
      <span>{props.freq}</span>
    </div>
  );
};

export default RatingBreakdownBar;