import React from 'react';
import $ from 'jquery';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingPanel from './components/SortingPanel.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {}
    };
  }

  componentDidMount() {
    $.ajax({
      url: `reviews/meta?product_id=${this.props.product_id}`,
      method: 'GET'
    }).then((meta) => {
      console.log(meta.characteristics);
      this.setState({
        meta: meta
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (!$.isEmptyObject(this.state.meta)) {
      return (
        <div>
          RATINGS & REVIEWS
          <div class='review-breakdown'>
            <RatingBreakdown product_id={this.props.product_id}/>
            <ProductBreakdown meta={this.state.meta}/>
          </div>
          <SortingPanel />
          <ReviewsList product_id={this.props.product_id}/>
          <ReviewForm />
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
