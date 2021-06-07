import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingPanel from './components/SortingPanel.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.fetchReviews = this.fetchReviews.bind(this);
  }

  fetchReviews() {
    $.ajax({
      url: '/reviews',
      method: 'GET',
      success: () => {
        console.log('Successfully retrieve reviews!');
      },
      error: (err) => {
        console.log('Failed to retrieve reviews!');
      }
    });
  }

  componentDidMount() {
    this.fetchReviews();
  }

  render() {
    return (
      <div>
        ratingsreviews
        <RatingBreakdown />
        <ProductBreakdown />
        <SortingPanel />
        <ReviewsList />
        <ReviewForm />
      </div>
    );
  }
}

export default RatingsReviews;
