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
      filteredReviews: [],
      sortingOption: 'relevance',
      starFilters: []
    };
    this.initialize = this.initialize.bind(this);
    this.handleOptionChanges = this.handleOptionChanges.bind(this);
    this.handleStarFilters = this.handleStarFilters.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.initialize();
    }
  }

  initialize() {
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
        reviews: reviews.results,
        filteredReviews: helpers.sortReviews(reviews.results, this.state.sortingOption)
      });
    }).catch((error) => {
      console.log(error);
    });

    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify([]));
    }
    sessionStorage.setItem('helpfulReviews', JSON.stringify([]));
    sessionStorage.setItem('reportedReviews', JSON.stringify([]));
  }

  handleOptionChanges(newOption) {
    var newFilteredReviews = this.updateReviews(this.state.reviews, newOption, this.state.starFilters);
    this.setState({
      sortingOption: newOption,
      filteredReviews: newFilteredReviews
    });
  }

  handleStarFilters(star) {
    var newStarFilters = this.state.starFilters.slice();
    if (this.state.starFilters.indexOf(star) === -1) {
      newStarFilters.push(star);
    } else {
      newStarFilters.splice(this.state.starFilters.indexOf(star), 1);
    }
    var newFilteredReviews = this.updateReviews(this.state.reviews, this.state.sortingOption, newStarFilters);
    this.setState({
      starFilters: newStarFilters,
      filteredReviews: newFilteredReviews
    });
  }

  removeFilters() {
    var newFilteredReviews = this.updateReviews(this.state.reviews, this.state.sortingOption, []);
    this.setState({
      starFilters: [],
      filteredReviews: newFilteredReviews
    });
  }

  updateReviews(review, sortingOption, starFilters) {
    var sortedReviews = helpers.sortReviews(review, sortingOption);
    var filteredReviews = helpers.applyStarFilters(sortedReviews, starFilters);
    return filteredReviews;
  }

  render() {
    if (!$.isEmptyObject(this.state.meta) && this.props.info !== null) {
      return (
        <div class='review-overall-container'>
          <span>RATINGS & REVIEWS</span>
          <div class='review-content-container'>
            <div id='review-left-container' class='review-sub-container left'>
              <RatingBreakdown product_id={this.props.product_id} meta={this.state.meta} handleStarFilters={this.handleStarFilters} starFilters={this.state.starFilters} removeFilters={this.removeFilters}/>
              <ProductBreakdown meta={this.state.meta}/>
            </div>
            <div id='review-right-container' class='review-sub-container right'>
              <SortingOptions handleOptionChanges={this.handleOptionChanges} reviews={this.state.filteredReviews}/>
              <ReviewsList reviews={this.state.filteredReviews} sortingOption={this.state.sortingOption}/>
              <ReviewForm productName={this.props.info.name} meta={this.state.meta}/>
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
