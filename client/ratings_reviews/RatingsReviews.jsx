import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingOptions from './components/SortingOptions.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import helpers from './helpers.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      reviews: [],
      sortingOption: 'relevance'
    };
    this.handleOptionChanges = this.handleOptionChanges.bind(this);
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
        reviews: helpers.sortReviews(reviews.results, this.state.sortingOption)
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleOptionChanges(newOption) {
    this.setState({
      sortingOption: newOption,
      reviews: helpers.sortReviews(this.state.reviews, newOption)
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
              <SortingOptions handleOptionChanges={this.handleOptionChanges} reviews={this.state.reviews}/>
              <ReviewsList reviews={this.state.reviews} sortingOption={this.state.sortingOption}/>
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
