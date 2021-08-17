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
    this.handleAddHelpful = this.handleAddHelpful.bind(this, this.props.review.review_id);
    this.handleReport = this.handleReport.bind(this, this.props.review.review_id);
  }

  toggleAdditionalBody(e) {
    this.setState({
      showAdditionalBody: !this.state.showAdditionalBody,
      showBody: !this.state.showBody,
    }, () => {
      if ($(e.target).text() === 'Show More') {
        $(e.target).text('Show Less');
      } else {
        $(e.target).text('Show More');
      }
    });
  }

  handleAddHelpful(reviewId) {
    helpers.handleAddHelpful(reviewId)
      .then(() => {
        this.setState({
          helpfulness: this.state.helpfulness + 1,
          showAddHelpfulButton: false
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  handleReport(reviewId) {
    helpers.handleReport(reviewId)
      .then(() => {
        this.setState({
          reportStatus: true
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    var formattedReviewTileInfo = helpers.formatReviewTile(this.props.review);
    this.setState({
      summary: formattedReviewTileInfo.summary,
      body: formattedReviewTileInfo.body,
      additionalBody: formattedReviewTileInfo.additionalBody,
      showBody: true,
      showAdditionalBody: false,
      showAdditionalBodyButton: formattedReviewTileInfo.showAdditionalBodyButton,
      showPhotos: formattedReviewTileInfo.showPhotos,
      showRecommend: this.props.review.recommend,
      showResponse: !(this.props.review.response === null || this.props.review.response.length === 0),
      reportStatus: false,
      helpfulness: this.props.review.helpfulness + formattedReviewTileInfo.helpful,
      showAddHelpfulButton: formattedReviewTileInfo.showAddHelpfulButton,
      reportStatus: formattedReviewTileInfo.reportStatus
    });
  }

  render() {
    return (
      <div className='review-tile'>
        <div className='review-tile-top-panel'>
          <span className="stars" style={{'--rating': this.props.review.rating}}></span>
          <span>{this.props.review.reviewer_name}, {helpers.formatDate(this.props.review.date.slice(0, 10))}</span>
        </div>
        <div
          className='review-summary'>
          {this.state.summary}
        </div>
        <div
          className='review-body'
          hidden={!this.state.showBody}>
          {this.state.body}
        </div>
        <div
          className='review-additional-body'
          hidden={!this.state.showAdditionalBody}>
          {this.state.additionalBody}
        </div>
        <div
          className='review-additional-body-button review-clickable'
          hidden={!this.state.showAdditionalBodyButton}
          onClick={this.toggleAdditionalBody}>
          Show More
        </div>
        <div
          className='review-photos'
          hidden={!this.state.showPhotos}>
          {this.props.review.photos.map((photo, idx) =>
            <ReviewPhoto
              key={idx}
              photo={photo}
              showPhotos={this.state.showPhotos}/>)}
        </div>
        <div
          className='user-recommend'
          hidden={!this.state.showRecommend}>
          I recommend this product!
        </div>
        <div
          className='seller-response'
          hidden={!this.state.showResponse}>
          Response: {this.props.review.response}
        </div>
        <div className='review-bottom-panel'>
          <span>Helpful?</span>
          {this.state.showAddHelpfulButton ? <span className='review-clickable' onClick={this.handleAddHelpful}>Yes</span> : <span>Yes</span>}
          <span>({this.state.helpfulness})</span>
          <span>|</span>
          {!this.state.reportStatus ? <span className='review-clickable' onClick={this.handleReport}>Report</span> : <span>Reported!</span>}
        </div>
      </div>
    );
  }
}

export default ReviewTile;