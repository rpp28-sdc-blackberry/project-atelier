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
      showResponse: false,
      reportStatus: false,
      helpfulness: 0,
      showAddHelpfulButton: true,
      reportStatus: false
    };
    this.toggleAdditionalBody = this.toggleAdditionalBody.bind(this);
    this.handleAddHelpful = this.handleAddHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
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
    }).then(() => {
      let currentHelpfulReviews = JSON.parse(sessionStorage.getItem('helpfulReviews'));
      currentHelpfulReviews.push(this.props.review.review_id);
      sessionStorage.setItem('helpfulReviews', JSON.stringify(currentHelpfulReviews));

      let allHelpfulReviews = JSON.parse(localStorage.getItem('helpfulReviews'));
      allHelpfulReviews.push(this.props.review.review_id);
      localStorage.setItem('helpfulReviews', JSON.stringify(allHelpfulReviews));

      this.setState({
        helpfulness: this.state.helpfulness + 1,
        showAddHelpfulButton: false
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleReport() {
    $.ajax({
      url: `reviews/${this.props.review.review_id}/report`,
      method: 'PUT'
    }).then(() => {
      let currentReportedReviews = JSON.parse(sessionStorage.getItem('reportedReviews'));
      currentReportedReviews.push(this.props.review.review_id);
      sessionStorage.setItem('reportedReviews', JSON.stringify(currentReportedReviews));

      this.setState({
        reportStatus: true
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    var formattedReviewTileInfo = helpers.formatReviewTile(this.props.review.summary, this.props.review.body, this.props.review.photos, this.props.review.review_id);
    this.setState({
      summary: formattedReviewTileInfo[0],
      body: formattedReviewTileInfo[1],
      additionalBody: formattedReviewTileInfo[2],
      showBody: true,
      showAdditionalBody: false,
      showAdditionalBodyButton: formattedReviewTileInfo[3],
      showPhotos: formattedReviewTileInfo[4],
      showRecommend: this.props.review.recommend,
      showResponse: !(this.props.review.response === null || this.props.review.response.length === 0),
      reportStatus: false,
      helpfulness: this.props.review.helpfulness + formattedReviewTileInfo[5],
      showAddHelpfulButton: formattedReviewTileInfo[6],
      reportStatus: formattedReviewTileInfo[7]
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
        <div class='review-additional-body-button review-clickable' hidden={!this.state.showAdditionalBodyButton} onClick={this.toggleAdditionalBody}>Show More</div>
        <div class='review-photos' hidden={!this.state.showPhotos}>
          {this.props.review.photos.map(photo => <ReviewPhoto photo={photo} showPhotos={this.state.showPhotos}/>)}
        </div>
        <div class='user-recommend' hidden={!this.state.showRecommend}>I recommend this product!</div>
        <div class='seller-response' hidden={!this.state.showResponse}>Response: {this.props.review.response}</div>
        <div class='review-bottom-panel'>
          <span>Helpful?</span>
          {this.state.showAddHelpfulButton ? <span class='review-clickable' onClick={this.handleAddHelpful}>Yes</span> : <span>Yes</span>}
          <span>({this.state.helpfulness})</span>
          <span>|</span>
          {!this.state.reportStatus ? <span class='review-clickable' onClick={this.handleReport}>Report</span> : <span>Reported!</span>}
        </div>
      </div>
    );
  }
}

export default ReviewTile;