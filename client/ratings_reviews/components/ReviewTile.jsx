import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.review.rating,
      showRecommend: this.props.review.recommend,
      showResponse: !(this.props.review.response === null || this.props.review.response.length === 0)
    };
  }

  render() {
    return (
      <div class='review-tile'>
        <div class="stars" style={{'--rating': this.state.rating}}></div>
        <div>{this.props.review.reviewer_name}, {this.props.review.date.slice(0, 10)}</div>
        <div>{this.props.review.summary}</div>
        <div>{this.props.review.body}</div>
        <div hidden={!this.state.showRecommend}>I recommend this product!</div>
        <div hidden={!this.state.showResponse}>Response: {this.props.review.response}</div>
        <div><span>Helpful? Yes {this.props.review.helpfulness} | Report</span></div>
      </div>
    );
  }
}

export default ReviewTile;