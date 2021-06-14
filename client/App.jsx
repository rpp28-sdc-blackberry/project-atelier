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
      'product_id': '22122',
      info: null,
      selectedStyle: null,
      styleInfo: null,
      indexStyleSelected: null,
    };

    fetch(`http://localhost:8080/products/${this.state.product_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          info: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`http://localhost:8080/products/${this.state.product_id}/styles`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i]['default?']) {
            var selectedStyle = data.results[i];
            var indexStyleSelected = i;
            this.setState({
              styleInfo: data.results,
              selectedStyle: selectedStyle,
              indexStyleSelected: indexStyleSelected,
            });
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.handleStyleSelection = this.handleStyleSelection.bind(this);
  }

  handleStyleSelection(e) {
    e.preventDefault();
    var index = Number(e.target.id);
    this.setState({
      indexStyleSelected: index,
      selectedStyle: this.state.styleInfo[index],
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {/* <ProductDetails
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}
          styleInfo={this.state.styleInfo}
          indexStyleSelected={this.state.indexStyleSelected}
          handleStyleSelection={this.handleStyleSelection}/>
        <RelatedItems
          product_id={this.state.product_id}
          info={this.state.info}
          selectedStyle={this.state.selectedStyle}/> */}
        <QuestionsAnswers
          product_id={this.state.product_id}
          info={this.state.info}/>
        {/* <RatingsReviews
          product_id={this.state.product_id}
          info={this.state.info}/> */}
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));