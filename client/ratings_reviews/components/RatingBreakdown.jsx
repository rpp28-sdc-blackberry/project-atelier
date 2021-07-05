import React from 'react';
import $ from 'jquery';
import RatingBreakdownBar from './RatingBreakdownBar.jsx';
import helpers from '../helpers.js';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageRating: [0, 0],
      breakdown: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      recommended: 0
    };
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.meta !== prevProps.meta) {
      this.initialize();
    }
  }

  initialize() {
    this.setState({
      averageRating: helpers.computeAverageRating(this.props.meta.ratings),
      breakdown: helpers.computeRatingBreakdown(this.props.meta.ratings),
      recommended: helpers.computeRecommendedPercentage(this.props.meta.recommended)
    });
  }

  render() {
    if (!$.isEmptyObject(this.props.meta.ratings)) {
      return (
        <div class='review-rating-breakdown'>
          <div class='review-average-rating'>
            <span class='review-average-rating-number'>{this.state.averageRating[0]}</span>
            <span class="stars" style={{'--rating': this.state.averageRating[1]}}></span>
          </div>
          <div class='review-recommended-percentage'>
            <span>{this.state.recommended} of reviews recommended this product</span>
          </div>
          <div class='review-filter-panel'>
            <div id='review-filter-panel-title'>Rating Breakdown</div>
            <div>Currently applied filters: {this.props.starFilters.map(starFilter => starFilter + ' ')}</div>
            <div
              class='review-clickable'
              onClick={this.props.removeFilters}
              hidden={!this.props.showRemoveFilters}>
              Remove all filters
            </div>
          </div>
          <div class='review-rating-bar'>
            {[...Array(5).keys()].reverse().map(x =>
              <RatingBreakdownBar
                star={x + 1}
                percentage={this.state.breakdown[x][0]}
                freq={this.state.breakdown[x][1]}
                handleRatingBreakdownClick={this.props.handleStarFilters}/>)}
          </div>
        </div>
      );
    } else {
      return (
        <div class='review-rating-breakdown'>
          <div class='review-average-rating'>
            <span class='review-average-rating-number'>0</span>
            <span class="stars" style={{'--rating': 0}}></span>
          </div>
          <div class='review-rating-bar'>
            {[...Array(5).keys()].reverse().map(x => <RatingBreakdownBar star={x + 1} percentage={0}/>)}
          </div>
        </div>
      );
    }
  }
}

export default RatingBreakdown;