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
      name: 'Morning Joggers',
      'product_id': '22122'
    };
  }

  render() {
    return (
      <div>
        <ProductDetails product_id={this.state.product_id}/>
        <RelatedItems product_id={this.state.product_id}/>
        <QuestionsAnswers name={this.state.name} product_id={this.state.product_id}/>
        <RatingsReviews product_id={this.state.product_id}/>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));