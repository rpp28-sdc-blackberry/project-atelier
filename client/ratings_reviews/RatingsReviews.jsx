import React from 'react';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingPanel from './components/SortingPanel.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        ratingsreviews
        <div class='review-breakdown'>
          <RatingBreakdown product_id={this.props.product_id}/>
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
