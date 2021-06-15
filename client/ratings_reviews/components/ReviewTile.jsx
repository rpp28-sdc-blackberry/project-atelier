import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import helpers from '../helpers.js';
import ReviewPhoto from './ReviewPhoto.jsx';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      body: '',
      additionalBody: '',
      showBody: false,
      showAdditionalBody: false,
      showAdditionalBodyButton: false,
      showPhotos: false,
      showRecommend: false,
      showResponse: false
    };
    this.toggleAdditionalBody = this.toggleAdditionalBody.bind(this);
    this.handleAddHelpful = this.handleAddHelpful.bind(this);
  }

  toggleAdditionalBody(e) {
    this.setState({
      showAdditionalBody: !this.state.showAdditionalBody,
      showBody: !this.state.showBody,
    });
    if ($(e.target).text() === 'Show More') {
      $(e.target).text('Show Less');
    } else {
      $(e.target).text('Show More');
    }
  }

  handleAddHelpful() {
    $.ajax({
      url: `reviews/${this.props.review.review_id}/helpful`,
      method: 'PUT'
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    var formattedReviewTileInfo = helpers.formatReviewTile(this.props.review.summary, this.props.review.body, this.props.review.photos);
    this.setState({
      summary: formattedReviewTileInfo[0],
      body: formattedReviewTileInfo[1],
      additionalBody: formattedReviewTileInfo[2],
      showBody: true,
      showAdditionalBody: false,
      showAdditionalBodyButton: formattedReviewTileInfo[3],
      showPhotos: formattedReviewTileInfo[4],
      showRecommend: this.props.review.recommend,
      showResponse: !(this.props.review.response === null || this.props.review.response.length === 0)
    });
  }

  render() {
    return (
      <div class='review-tile'>
        <div class='review-tile-top-panel'>
          <span class="stars" style={{'--rating': this.props.review.rating}}></span>
          <span>{this.props.review.reviewer_name}, {helpers.formatDate(this.props.review.date.slice(0, 10))}</span>
        </div>
        <div class='review-summary'>{this.state.summary}</div>
        <div class='review-body' hidden={!this.state.showBody}>{this.state.body}</div>
        <div class='review-additional-body' hidden={!this.state.showAdditionalBody}>{this.state.additionalBody}</div>
        <div class='review-additional-body-button' hidden={!this.state.showAdditionalBodyButton} onClick={this.toggleAdditionalBody}>Show More</div>
        <div class='review-photos' hidden={!this.state.showPhotos}>
          {this.props.review.photos.map(photo => <ReviewPhoto photo={photo} showPhotos={this.state.showPhotos}/>)}
        </div>
        <div class='user-recommend' hidden={!this.state.showRecommend}>I recommend this product!</div>
        <div class='seller-response' hidden={!this.state.showResponse}>Response: {this.props.review.response}</div>
        <div>
          <span>Helpful?</span>
          <span class='review-clickable' onClick={this.handleAddHelpful}>Yes</span>
          <span>({this.props.review.helpfulness}) | </span>
          <span>Report</span>
        </div>
      </div>
    );
  }
}

export default ReviewTile;