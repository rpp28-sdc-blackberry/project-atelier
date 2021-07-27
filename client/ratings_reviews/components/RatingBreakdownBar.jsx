import React from 'react';

const RatingBreakdownBar = (props) => {
  return (
    <div onClick={() => props.handleRatingBreakdownClick(props.star)} className='review-breakdown-bar review-clickable'>
      <span className='review-clickable'>{props.star} stars:</span>
      <span><progress max="100" value={props.percentage}></progress></span>
      <span className='review-breakdown-freq'>{props.freq}</span>
    </div>
  );
};

export default RatingBreakdownBar;