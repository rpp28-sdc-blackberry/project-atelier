import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from './product_details/ProductDetails.jsx';
import QuestionsAnswers from './questions_answers/QuestionsAnswers.jsx';
import RatingsReviews from './ratings_reviews/RatingsReviews.jsx';
import RelatedItems from './related_items/RelatedItems.jsx';
import ClickWrapper from './ClickWrapper.jsx';
import {computeAverageRating} from './ratings_reviews/helpers.js';

const WrappedProductDetails = ClickWrapper(ProductDetails, 'Product Details');
const WrappedRelatedItems = ClickWrapper(RelatedItems, 'Related Items');
const WrappedQuestionsAnswers = ClickWrapper(QuestionsAnswers, 'Questions and Answers');
const WrappedRatingsReviews = ClickWrapper(RatingsReviews, 'Ratings and Reviews');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: '',
      info: null,
      selectedStyle: null,
      styleInfo: null,
      indexStyleSelected: null,
      meta: null,
      averageRating: null,
      reviews: null,
      currProductAddedToOutfit: false
    };

    this.handleStyleSelection = this.handleStyleSelection.bind(this);
    this.handleRelatedItemClick = this.handleRelatedItemClick.bind(this);
    this.initialize = this.initialize.bind(this);
    this.addCurrProductToOutfit = this.addCurrProductToOutfit.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize(productId = '22122') {
    Promise.all([fetch(`/products/${productId}`),
      fetch(`/products/${productId}/styles`),
      fetch(`/reviews/meta?product_id=${productId}`),
      fetch(`reviews/?product_id=${productId}&page=1&count=1000&sort=relevant`)
    ])
      .then((responses) => {
        return Promise.all(responses.map(response => response.json()));
      })
      .then((parsedResponses) => {
        var data = parsedResponses[1];
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i]['default?']) {
            var selectedStyle = data.results[i];
            var indexStyleSelected = i;
          }
        }
        this.setState({
          product_id: productId,
          info: parsedResponses[0],
          selectedStyle: selectedStyle || data.results[0],
          indexStyleSelected: indexStyleSelected || 0,
          styleInfo: data.results,
          meta: parsedResponses[2],
          averageRating: computeAverageRating(parsedResponses[2].ratings)[1],
          reviews: parsedResponses[3].results
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  handleStyleSelection(e) {
    e.preventDefault();
    var index = Number(e.target.id);
    this.setState({
      indexStyleSelected: index,
      selectedStyle: this.state.styleInfo[index],
    });
  }

  handleRelatedItemClick(id) {
    let newId = id.toString();
    this.initialize(newId);
  }
  
  addCurrProductToOutfit(boolean) {
    this.setState({
      currProductAddedToOutfit: boolean
    });
  }

  render() {

    if (this.state.product_id === '') {
      return (<div>loading...</div>);
    }

    return (
      <div>
        <nav>
          <div id='nav-logo'>LOGO</div>
          <div id='nav-search'>
            <input type='text'></input>
            <div class='search-icon'> </div>
          </div>
        </nav>
        <div id='announcement-banner'><em>SITE-WIDE ANNOUNCEMENT MESSAGE!</em>  —  SALE / DISCOUNT <strong>OFFER</strong>  —  <u>NEW PRODUCT HIGHLIGHT</u></div>

        <WrappedProductDetails
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          styleInfo={this.state.styleInfo}
          indexStyleSelected={this.state.indexStyleSelected}
          handleStyleSelection={this.handleStyleSelection}
          averageRating={this.state.averageRating}
          reviewsNumber={this.state.reviews.length}
          addToOutfit={this.addCurrProductToOutfit}
          currProductAddedToOutfit={this.state.currProductAddedToOutfit}/>
        <WrappedRelatedItems
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          averageRating={this.state.averageRating}
          handleRelatedItemClick={this.handleRelatedItemClick}
          currProductAddedToOutfit={this.state.currProductAddedToOutfit}
          addCurrProductToOutfit={this.addCurrProductToOutfit}/>
        <WrappedQuestionsAnswers
          product_id={this.state.product_id}
          name={this.state.info.name}/>
        <WrappedRatingsReviews
          product_id={this.state.product_id}
          info={this.state.info}
          meta={this.state.meta}
          reviews={this.state.reviews}/>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));