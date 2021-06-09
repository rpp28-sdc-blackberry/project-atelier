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
        averageRating: helpers.computeAverageRating(reviewsMeta.ratings)
      });
    }).catch((error) => {
      console.log(error);
    });

    this.state = {
      rating: 0,
      averageRating: 0
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
        <div class='review-rating-bar'></div>
      </div>
    );
  }
}

export default RatingBreakdown;