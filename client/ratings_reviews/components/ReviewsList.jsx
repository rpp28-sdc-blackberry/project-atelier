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
      showLessReviewsButton: false,
      sortingOption: 'relevance'
    };
    this.initialize = this.initialize.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.showLessReviews = this.showLessReviews.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.reviews !== prevProps.reviews) {
      this.initialize();
    }
  }

  // may need refactoring
  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews.length > 2) {
      this.setState({
        allReviews: nextProps.reviews,
        currentReviews: nextProps.reviews.slice(0, 2),
        otherReviews: nextProps.reviews.slice(2),
        showMoreReviewsButton: true,
        showLessReviewsButton: false,
        sortingOption: nextProps.sortingOption
      });
    } else {
      this.setState({
        allReviews: nextProps.reviews,
        currentReviews: nextProps.reviews,
        otherReviews: [],
        showMoreReviewsButton: false,
        showLessReviewsButton: false,
        sortingOption: nextProps.sortingOption
      });
    }
  }

  initialize() {
    if (this.props.reviews && this.props.reviews.length > 2) {
      this.setState({
        allReviews: this.props.reviews,
        currentReviews: this.props.reviews.slice(0, 2),
        otherReviews: this.props.reviews.slice(2),
        showMoreReviewsButton: true,
        showLessReviewsButton: false,
        sortingOption: this.props.sortingOption
      });
    } else {
      this.setState({
        allReviews: this.props.reviews,
        currentReviews: this.props.reviews,
        otherReviews: [],
        showMoreReviewsButton: false,
        showLessReviewsButton: false,
        sortingOption: this.props.sortingOption
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
        showMoreReviewsButton: false,
        showLessReviewsButton: true
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
        <div key={this.props.reviews[0].review_id} id='reviews-list-overall-container'>
          <div id='reviews-list-tile-container'>{this.state.currentReviews.map(review =>
            <ReviewTile review={review}/>)}
          </div>
          <div>
            <button
              class='review-button review-more'
              onClick={this.showMoreReviews}
              hidden={!this.state.showMoreReviewsButton}>
              MORE REVIEWS
            </button>
            <button
              class='review-button review-less'
              onClick={this.showLessReviews}
              hidden={!this.state.showLessReviewsButton}>
              LESS REVIEWS
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        Such emptiness! Be the first person to review this product!
      </div>
    );
  }
}

export default ReviewsList;