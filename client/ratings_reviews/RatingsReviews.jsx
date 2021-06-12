import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingOptions from './components/SortingOptions.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      reviews: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: `reviews/meta?product_id=${this.props.product_id}`,
      method: 'GET'
    }).then((meta) => {
      this.setState({
        meta: meta
      });
    }).catch((error) => {
      console.log(error);
    });

    $.ajax({
      url: `reviews/?product_id=${this.props.product_id}&page=1&count=100&sort=relevant`,
      method: 'GET'
    }).then((reviews) => {
      this.setState({
        reviews: reviews.results
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (!$.isEmptyObject(this.state.meta) && this.state.reviews.length !== 0) {
      return (
        <div class='review-overall-container'>
          RATINGS & REVIEWS
          <div class='review-content-container'>
            <div id='review-left-container' class='review-sub-container left'>
              <RatingBreakdown product_id={this.props.product_id}/>
              <ProductBreakdown meta={this.state.meta}/>
            </div>
            <div id='review-right-container' class='review-sub-container right'>
              <SortingOptions />
              <ReviewsList reviews={this.state.reviews}/>
              <ReviewForm />
            </div>
          </div>

        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default RatingsReviews;
