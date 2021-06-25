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
      averageRating: null
    };

    this.handleStyleSelection = this.handleStyleSelection.bind(this);
    this.handleRelatedItemClick = this.handleRelatedItemClick.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize(productId = '22122') {
    Promise.all([fetch(`/products/${productId}`, { mode: 'no-cors' }), fetch(`/products/${productId}/styles`, { mode: 'no-cors' }), fetch(`/reviews/meta?product_id=${productId}`, { mode: 'no-cors' })])
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
          averageRating: computeAverageRating(parsedResponses[2].ratings)[1]
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

  render() {

    if (this.state.product_id === '') {
      return (<div>loading...</div>);
    }

    return (
      <div>
        <WrappedProductDetails
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          styleInfo={this.state.styleInfo}
          indexStyleSelected={this.state.indexStyleSelected}
          handleStyleSelection={this.handleStyleSelection}/>
        <WrappedRelatedItems
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          handleRelatedItemClick={this.handleRelatedItemClick}/>
        <WrappedQuestionsAnswers
          product_id={this.state.product_id}
          name={this.state.info.name}/>
        <WrappedRatingsReviews
          product_id={this.state.product_id}
          info={this.state.info}
          meta={this.state.meta}/>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));