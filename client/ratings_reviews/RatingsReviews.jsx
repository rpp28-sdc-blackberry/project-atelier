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
      filteredReviews: helpers.sortReviews(this.props.reviews, 'relevance'),
      sortingOption: 'relevance',
      starFilters: [],
      keyword: '',
      showRemoveFilters: false
    });
    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify([]));
    }
    sessionStorage.setItem('helpfulReviews', JSON.stringify([]));
    sessionStorage.setItem('reportedReviews', JSON.stringify([]));
  }

  handleOptionChanges(newOption) {
    let newFilteredReviews = this.updateReviews(this.props.reviews, newOption, this.state.starFilters, this.state.keyword);
    this.setState({
      sortingOption: newOption,
      filteredReviews: newFilteredReviews
    });
  }

  handleStarFilters(star) {
    let newStarFilters = this.state.starFilters.slice();
    if (this.state.starFilters.indexOf(star) === -1) {
      newStarFilters.push(star);
    } else {
      newStarFilters.splice(this.state.starFilters.indexOf(star), 1);
    }
    let newFilteredReviews = this.updateReviews(this.props.reviews, this.state.sortingOption, newStarFilters, this.state.keyword);
    let showRemoveFilters = newStarFilters.length !== 0;
    this.setState({
      starFilters: newStarFilters,
      filteredReviews: newFilteredReviews,
      showRemoveFilters: showRemoveFilters
    });
  }

  removeFilters() {
    let newFilteredReviews = this.updateReviews(this.props.reviews, this.state.sortingOption, [], this.state.keyword);
    this.setState({
      starFilters: [],
      filteredReviews: newFilteredReviews,
      showRemoveFilters: false
    });
  }

  handleSearch(keyword) {
    keyword = keyword.length < 3 ? '' : keyword;
    let queriedReviews = this.updateReviews(this.props.reviews, this.state.sortingOption, this.state.starFilters, keyword);
    this.setState({
      keyword: keyword,
      filteredReviews: queriedReviews
    });
  }

  updateReviews(review, sortingOption, starFilters, keyword) {
    let sortedReviews = helpers.sortReviews(review, sortingOption);
    let filteredReviews = helpers.applyStarFilters(sortedReviews, starFilters);
    let queriedReviews = helpers.applyKeyword(filteredReviews, keyword);
    return queriedReviews;
  }

  render() {
    return (
      <div id='review-overall-container'>
        <span>RATINGS & REVIEWS</span>
        <div id='review-content-container'>
          <div id='review-left-container'>
            <RatingBreakdown
              product_id={this.props.product_id}
              meta={this.props.meta}
              starFilters={this.state.starFilters}
              showRemoveFilters={this.state.showRemoveFilters}
              handleStarFilters={this.handleStarFilters}
              removeFilters={this.removeFilters}/>
            <ProductBreakdown
              meta={this.props.meta}/>
          </div>
          <div id='review-right-container'>
            <SearchBar
              handleSearch={this.handleSearch}/>
            <SortingOptions
              product_id={this.props.product_id}
              reviews={this.state.filteredReviews}
              sortingOption={this.state.sortingOption}
              handleOptionChanges={this.handleOptionChanges}/>
            <ReviewsList
              reviews={this.state.filteredReviews}
              sortingOption={this.state.sortingOption}/>
            <ReviewForm
              productName={this.props.info.name}
              meta={this.props.meta}/>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsReviews;
