import React from 'react';

const RatingBreakdownBar = (props) => {
  const handleClick = () => {
    props.handleRatingBreakdownClick(props.star);
  };
  return (
    <div onClick={handleClick} class='review-breakdown-bar'>
      <span>{props.star} stars:</span>
      <span><progress max="100" value={props.percentage}></progress></span>
      <span>{props.freq}</span>
    </div>
  );
};

export default RatingBreakdownBar;