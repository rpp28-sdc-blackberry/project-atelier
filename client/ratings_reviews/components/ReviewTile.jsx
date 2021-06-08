import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.review.rating
    };
  }

  render() {
    var responseVisibility = true;
    if (this.props.review.response === null || this.props.review.response.length === 0) {
      responseVisibility = false;
    }
    return (
      <div class='review-tile'>
        <div class="stars" style={{'--rating': this.state.rating}}></div>
        <div>{this.props.review.reviewer_name}, {this.props.review.date.slice(0, 10)}</div>
        <div>{this.props.review.summary}</div>
        <div>{this.props.review.body}</div>
        <div hidden={!this.props.review.recommend}>I recommend this product!</div>
        <div hidden={!responseVisibility}>Response: {this.props.review.response}</div>
        <div><span>Helpful? Yes {this.props.review.helpfulness} | Report</span></div>
      </div>
    );
  }
}

export default ReviewTile;