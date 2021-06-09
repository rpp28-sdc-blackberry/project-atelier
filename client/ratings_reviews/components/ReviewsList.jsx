import React from 'react';
import $ from 'jquery';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    $.ajax({
      url: `reviews/?product_id=${this.props.product_id}&page=1&count=100&sort=relevant`,
      method: 'GET'
    }).then((reviews) => {
      if (reviews.results.length > 2) {
        this.setState({
          currentReviews: reviews.results.slice(0, 2),
          otherReviews: reviews.results.slice(2),
          showMoreReviewsButton: true
        });
      } else {
        this.setState({
          currentReviews: reviews.results
        });
      }
    }).catch((error) => {
      console.log(error);
    });

    this.state = {
      currentReviews: [],
      otherReviews: [],
      showMoreReviewsButton: false
    };
  }

  render() {
    return (
      <div>
        reviewslist
        <div>{this.state.currentReviews.map(review => <ReviewTile review={review}/>)}</div>
      </div>
    );
  }
}

export default ReviewsList;
