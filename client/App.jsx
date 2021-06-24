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
        <WrappedQuestionsAnswers
          product_id={this.state.product_id}
          name={this.state.info.name}/>
        <RatingsReviews
          product_id={this.state.product_id}
          info={this.state.info}/>
      </div>
    );
  }

}

const clickWrapper = (ComponentToWrap, moduleName) => {
  return (props) => (
    <div onClick={(e) => {
      // console.log(e.target.outerHTML, moduleName, new Date);
      fetch('http://localhost:8080/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          element: e.target.outerHTML,
          widget: moduleName,
          time: new Date
        })
      })
        .then(data => console.log('Click event recorded!', data))
        .catch(error => console.log('Error:', error));
    }}>
      <ComponentToWrap {...props}/>
    </div>
  );
};

const WrappedQuestionsAnswers = clickWrapper(QuestionsAnswers, 'Questions and Answers');

ReactDOM.render(<App />, document.getElementById('app'));