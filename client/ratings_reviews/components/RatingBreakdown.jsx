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
      console.log('reviewsMeta', reviewsMeta);
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
      averageRating: 0,
      breakdown: []
    };
  }

  render() {
    return (
      <div class='review-rating-breakdown'>
        ratingbreakdown
        <div class='review-average-rating'>
          <span>{this.state.averageRating}</span>
          <span class="stars" style={{'--rating': this.state.averageRating}}></span>
        </div>
        <div class='review-rating-bar'>
          <div>1: {this.state.breakdown[0]}</div>
          <div>2: {this.state.breakdown[1]}</div>
          <div>3: {this.state.breakdown[2]}</div>
          <div>4: {this.state.breakdown[3]}</div>
          <div>5: {this.state.breakdown[4]}</div>
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;