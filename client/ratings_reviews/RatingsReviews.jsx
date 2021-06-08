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
      url: `http://localhost:8080/reviews/?product_id=${this.props.product_id}&page=1&count=100&sort=relevant`,
      method: 'GET',
      success: (reviews) => {
        console.log('Successfully retrieve reviews!');
        console.log('reviews: ', reviews);
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
        <ReviewsList reviews={this.state.reviews.results}/>
        <ReviewForm />
      </div>
    );
  }
}

export default RatingsReviews;
