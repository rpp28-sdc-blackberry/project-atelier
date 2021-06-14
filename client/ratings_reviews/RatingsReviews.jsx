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
    this.handleOptionChanges = this.handleOptionChanges.bind(this);
    this.handleStarFilters = this.handleStarFilters.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
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
        reviews: reviews.results,
        filteredReviews: helpers.sortReviews(reviews.results, this.state.sortingOption)
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  // handleOptionChanges(newOption) {
  //   var sortedReviews = helpers.sortReviews(this.state.reviews, newOption);
  //   var filteredReviews = helpers.applyStarFilters(sortedReviews, this.state.starFilters);
  //   this.setState({
  //     sortingOption: newOption,
  //     filteredReviews: filteredReviews
  //   });
  // }

  // handleStarFilters(star) {
  //   var newStarFilters = this.state.starFilters.slice();
  //   console.log('current: ', this.state.starFilters);
  //   if (this.state.starFilters.indexOf(star) === -1) {
  //     newStarFilters.push(star);
  //   } else {
  //     newStarFilters.splice(this.state.starFilters.indexOf(star), 1);
  //   }
  //   console.log('new: ', newStarFilters);
  //   console.log('previous filteredReviews: ', this.state.filteredReviews);
  //   var filteredReviews = helpers.applyStarFilters(this.state.filteredReviews, newStarFilters);
  //   this.setState({
  //     starFilters: newStarFilters,
  //     filteredReviews: filteredReviews
  //   });
  // }

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

  updateReviews(review, sortingOption, starFilters) {
    var sortedReviews = helpers.sortReviews(review, sortingOption);
    var filteredReviews = helpers.applyStarFilters(sortedReviews, starFilters);
    return filteredReviews;
  }

  render() {
    if (!$.isEmptyObject(this.state.meta) && this.state.reviews.length !== 0) {
      return (
        <div class='review-overall-container'>
          RATINGS & REVIEWS
          <div class='review-content-container'>
            <div id='review-left-container' class='review-sub-container left'>
              <RatingBreakdown product_id={this.props.product_id} meta={this.state.meta} handleStarFilters={this.handleStarFilters}/>
              <ProductBreakdown meta={this.state.meta}/>
            </div>
            <div id='review-right-container' class='review-sub-container right'>
              <SortingOptions handleOptionChanges={this.handleOptionChanges} reviews={this.state.filteredReviews}/>
              <ReviewsList reviews={this.state.filteredReviews} sortingOption={this.state.sortingOption}/>
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
