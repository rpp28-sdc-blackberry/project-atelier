import React from 'react';
import ReactDOM from 'react-dom';
import ProductDetails from './product_details/ProductDetails.jsx';
import QuestionsAnswers from './questions_answers/QuestionsAnswers.jsx';
import RatingsReviews from './ratings_reviews/RatingsReviews.jsx';
import RelatedItems from './related_items/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: '',
      info: null,
      selectedStyle: null,
      styleInfo: null,
      indexStyleSelected: null,
    };

    this.handleStyleSelection = this.handleStyleSelection.bind(this);
    this.handleRelatedItemClick = this.handleRelatedItemClick.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize(productId = '22122') {
    Promise.all([fetch(`http://localhost:8080/products/${productId}`), fetch(`http://localhost:8080/products/${productId}/styles`)])
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
          styleInfo: data.results
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
        <ProductDetails
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          styleInfo={this.state.styleInfo}
          indexStyleSelected={this.state.indexStyleSelected}
          handleStyleSelection={this.handleStyleSelection}/>
        <RelatedItems
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          handleRelatedItemClick={this.handleRelatedItemClick}/>
        <QuestionsAnswers
          product_id={this.state.product_id}
          name={this.state.info.name}/>
        <RatingsReviews
          product_id={this.state.product_id}
          info={this.state.info}/>
      </div>
    );
  }

}

const initClickHandler = (functionToInvoke, idsToSearchFor) => {
  window.addEventListener('click', (e) => {
    handleClick(e, functionToInvoke, idsToSearchFor);
  }, false);
};

const findModule = (element, idsToMatch) => {
  // element has an ID matching one of the modules
  if (idsToMatch.includes(element.id)) {
    // return the name of the module
    return element.id;
  }
  // element has no parent -> return some string
  if (!element.parentElement) {
    return 'module not found';
  }
  // return an invocation of findModule on element.parentElement
  return findModule(element.parentElement, idsToMatch);
};

let atelierModuleIds = ['qa-component', 'productDetails', 'ratings-and-reviews', 'relatedItemsWrapper'];

const handleClick = (e, functionToInvoke, idsToSearchFor) => {

  console.log('element: ', e.target.outerHTML, 'module :', functionToInvoke(e.target, idsToSearchFor), 'timestamp: ', new Date);
};

// initClickHandler(findModule, atelierModuleIds);

ReactDOM.render(<App />, document.getElementById('app'));