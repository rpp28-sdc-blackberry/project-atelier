import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingPanel from './components/SortingPanel.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import reviewsDummy from './reviewsDummy.js';
import helpers from './helpers.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);

    $.ajax({
      url: `reviews/meta?product_id=${this.props.product_id}`,
      method: 'GET'
    }).then((reviewsMeta) => {
      console.log('reviewsMeta', reviewsMeta);
      this.setState({
        ratings: reviewsMeta.ratings,
        characteristics: reviewsMeta.characteristics
      });
    }).catch((error) => {
      console.log(error);
    });

    this.state = {
      ratings: {},
      characteristics: {}
    };
  }

  render() {
    return (
      <div>
        ratingsreviews
        <div class='review-breakdown'>
          <RatingBreakdown ratings={this.state.ratings}/>
          <ProductBreakdown />
        </div>
        <SortingPanel />
        <ReviewsList product_id={this.props.product_id}/>
        <ReviewForm />
      </div>
    );
  }
}

export default RatingsReviews;
