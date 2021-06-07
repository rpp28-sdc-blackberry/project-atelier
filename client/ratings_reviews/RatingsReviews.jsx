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
    this.fetchReviews = this.fetchReviews.bind(this);
  }

  fetchReviews() {
    $.ajax({
      url: '/reviews',
      method: 'GET',
      data: {
        'page': 1,
        'count': 100,
        'product_id': this.props.product_id,
        'sort': 'relevant'
      },
      dataType: 'json',
      success: (reviews) => {
        console.log('Successfully retrieve reviews!');
        this.setState({
          reviews: reviews
        });
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
