import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
    this.updateStars = this.updateStars.bind(this);
  }

  updateStars() {
    var percentage = (this.props.review.rating / 5) * 100;
    var percentageRounded = (Math.round(percentage * 4) / 4).toFixed(2);
  }

  render() {
    var responseVisibility = true;
    if (this.props.review.response === null || this.props.review.response.length === 0) {
      responseVisibility = false;
    }
    return (
      <div class='review-tile'>
        <div id={this.props.review.review_id}>Rating: {this.props.review.rating}
          <div class='stars-outer'>
            <div class='stars-inner'></div>
          </div>
        </div>
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