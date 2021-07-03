import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingOptions from './components/SortingOptions.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import helpers from './helpers.js';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      reviews: [],
      filteredReviews: [],
      sortingOption: 'relevance',
      starFilters: [],
      keyword: '',
      showRemoveFilters: false
    };
    this.initialize = this.initialize.bind(this);
    this.handleOptionChanges = this.handleOptionChanges.bind(this);
    this.handleStarFilters = this.handleStarFilters.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    this.setState({
      meta: this.props.meta,
      reviews: this.props.reviews,
      filteredReviews: helpers.sortReviews(this.props.reviews, this.state.sortingOption),
      starFilters: []
    });
    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify([]));
    }
    sessionStorage.setItem('helpfulReviews', JSON.stringify([]));
    sessionStorage.setItem('reportedReviews', JSON.stringify([]));
  }

  handleOptionChanges(newOption) {
    var newFilteredReviews = this.updateReviews(this.state.reviews, newOption, this.state.starFilters, this.state.keyword);
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
    var newFilteredReviews = this.updateReviews(this.state.reviews, this.state.sortingOption, newStarFilters, this.state.keyword);
    var showRemoveFilters = newStarFilters.length !== 0;
    this.setState({
      starFilters: newStarFilters,
      filteredReviews: newFilteredReviews,
      showRemoveFilters: showRemoveFilters
    });
  }

  removeFilters() {
    var newFilteredReviews = this.updateReviews(this.state.reviews, this.state.sortingOption, [], this.state.keyword);
    this.setState({
      starFilters: [],
      filteredReviews: newFilteredReviews,
      showRemoveFilters: false
    });
  }

  handleSearch(keyword) {
    if (keyword.length < 3) {
      keyword = '';
    }
    var queriedReviews = this.updateReviews(this.state.reviews, this.state.sortingOption, this.state.starFilters, keyword);
    this.setState({
      keyword: keyword,
      filteredReviews: queriedReviews
    });
  }

  updateReviews(review, sortingOption, starFilters, keyword) {
    var sortedReviews = helpers.sortReviews(review, sortingOption);
    var filteredReviews = helpers.applyStarFilters(sortedReviews, starFilters);
    var queriedReviews = helpers.applyKeyword(filteredReviews, keyword);
    return queriedReviews;
  }

  render() {
    if (!$.isEmptyObject(this.state.meta) && this.props.info !== null) {
      return (
        <div class='review-overall-container'>
          <span>RATINGS & REVIEWS</span>
          <div class='review-content-container'>
            <div id='review-left-container' class='review-sub-container left'>
              <RatingBreakdown product_id={this.props.product_id} meta={this.state.meta} handleStarFilters={this.handleStarFilters} starFilters={this.state.starFilters} removeFilters={this.removeFilters} showRemoveFilters={this.state.showRemoveFilters}/>
              <ProductBreakdown meta={this.state.meta}/>
            </div>
            <div id='review-right-container' class='review-sub-container right'>
              <SearchBar handleSearch={this.handleSearch}/>
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
