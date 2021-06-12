import React from 'react';
import $ from 'jquery';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allReviews: [],
      currentReviews: [],
      otherReviews: [],
      showMoreReviewsButton: false,
      showLessReviewsButton: false
    };

    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.showLessReviews = this.showLessReviews.bind(this);
  }

  componentDidMount() {
    console.log('reviews in reviewslist: ', this.props.reviews);
    if (this.props.reviews.length > 2) {
      this.setState({
        allReviews: this.props.reviews,
        currentReviews: this.props.reviews.slice(0, 2),
        otherReviews: this.props.reviews.slice(2),
        showMoreReviewsButton: true
      });
    } else {
      this.setState({
        currentReviews: this.props.reviews
      });
    }
  }

  showMoreReviews() {
    if (this.state.otherReviews.length > 2) {
      this.setState({
        currentReviews: this.state.currentReviews.concat(this.state.otherReviews.slice(0, 2)),
        otherReviews: this.state.otherReviews.slice(2),
        showLessReviewsButton: true
      });
    } else {
      this.setState({
        currentReviews: this.state.currentReviews.concat(this.state.otherReviews),
        showMoreReviewsButton: false
      });
    }
  }

  showLessReviews() {
    this.setState({
      currentReviews: this.state.allReviews.slice(0, 2),
      otherReviews: this.state.allReviews.slice(2),
      showMoreReviewsButton: true,
      showLessReviewsButton: false
    });
  }

  render() {
    if (this.state.allReviews.length !== 0) {
      return (
        <div class='reviews-list'>
          <div>{this.state.currentReviews.map(review => <ReviewTile review={review}/>)}</div>
          <button class='review-show-button' onClick={this.showMoreReviews} hidden={!this.state.showMoreReviewsButton}>More Reviews</button>
          <button class='review-show-button' onClick={this.showLessReviews} hidden={!this.state.showLessReviewsButton}>Less Reviews</button>
        </div>
      );
    } else {
      return (
        <div>
          Such emptiness! Be the first person to review this product!
        </div>
      );
    }
  }
}

export default ReviewsList;