import React from 'react';
import $ from 'jquery';
import helpers from '../helpers.js';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    $.ajax({
      url: `reviews/meta?product_id=${this.props.product_id}`,
      method: 'GET'
    }).then((reviewsMeta) => {
      this.setState({
        ratings: reviewsMeta.ratings,
        averageRating: helpers.computeAverageRating(reviewsMeta.ratings),
        breakdown: helpers.computeRatingBreakdown(reviewsMeta.ratings)
      });
    }).catch((error) => {
      console.log(error);
    });

    this.state = {
      ratings: 0,
      averageRating: [0, 0],
      breakdown: [0, 0, 0, 0, 0]
    };
  }

  render() {
    return (
      <div class='review-rating-breakdown'>
        <div class='review-average-rating'>
          <span class='review-average-rating-number'>{this.state.averageRating[0]}</span>
          <span class="stars" style={{'--rating': this.state.averageRating[1]}}></span>
        </div>
        <div class='review-rating-bar'>
          <div class='review-breakdown-bar'>
            <span>5 stars:</span>
            <span><progress max="100" value={this.state.breakdown[4]}></progress></span>
          </div>
          <div class='review-breakdown-bar'>
            <span>4 stars:</span>
            <span><progress max="100" value={this.state.breakdown[3]}></progress></span>
          </div>
          <div class='review-breakdown-bar'>
            <span>3 stars:</span>
            <span><progress max="100" value={this.state.breakdown[2]}></progress></span>
          </div>
          <div class='review-breakdown-bar'>
            <span>2 stars:</span>
            <span><progress max="100" value={this.state.breakdown[1]}></progress></span>
          </div>
          <div class='review-breakdown-bar'>
            <span>1 star:</span>
            <span><progress max="100" value={this.state.breakdown[0]}></progress></span>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;