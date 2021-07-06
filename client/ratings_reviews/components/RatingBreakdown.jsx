import React from 'react';
import $ from 'jquery';
import RatingBreakdownBar from './RatingBreakdownBar.jsx';
import helpers from '../helpers.js';

const RatingBreakdown = (props) => {
  let averageRating = helpers.computeAverageRating(props.meta.ratings);
  let breakdown = helpers.computeRatingBreakdown(props.meta.ratings);
  let recommended = helpers.computeRecommendedPercentage(props.meta.recommended);
  if (!$.isEmptyObject(props.meta.ratings)) {
    return (
      <div id='review-rating-breakdown-overall-container'>
        <div id='review-average-rating-container'>
          <span id='review-average-rating-number'>{averageRating[0]}</span>
          <span class="stars" style={{'--rating': averageRating[1]}}></span>
        </div>
        <div id='review-recommended-percentage'>
          <span>{recommended} of reviews recommended this product</span>
        </div>
        <div id='review-filter-summary-container'>
          <div id='review-filter-summary-title'>Rating Breakdown</div>
          <div>Currently applied filters: {props.starFilters.map(starFilter => starFilter + ' ')}</div>
          <div
            class='review-clickable'
            onClick={props.removeFilters}
            hidden={!props.showRemoveFilters}>
            Remove all filters
          </div>
        </div>
        <div id='review-rating-bar-container'>
          {[...Array(5).keys()].reverse().map(x =>
            <RatingBreakdownBar
              star={x + 1}
              percentage={breakdown[x][0]}
              freq={breakdown[x][1]}
              handleRatingBreakdownClick={props.handleStarFilters}/>)}
        </div>
      </div>
    );
  }
  return (
    <div id='review-rating-breakdown-overall-container'>
      <div id='review-average-rating-container'>
        <span id='review-average-rating-number'>0</span>
        <span class="stars" style={{'--rating': 0}}></span>
      </div>
      <div id='review-rating-bar-container'>
        {[...Array(5).keys()].reverse().map(x =>
          <RatingBreakdownBar
            star={x + 1}
            percentage={0}/>)}
      </div>
    </div>
  );
};

export default RatingBreakdown;