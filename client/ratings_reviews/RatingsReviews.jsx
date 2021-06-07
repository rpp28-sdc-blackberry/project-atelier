import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingPanel from './components/SortingPanel.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import reviewsDummy from './reviewsDummy.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: reviewsDummy
    };
  }

  render() {
    return (
      <div>
        ratingsreviews
        <RatingBreakdown />
        <ProductBreakdown />
        <SortingPanel />
        <ReviewsList reviews={this.state.reviews.results}/>
        <ReviewForm />
      </div>
    );
  }
}

export default RatingsReviews;
