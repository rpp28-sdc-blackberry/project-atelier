import React from 'react';
import ReviewFormModal from './ReviewFormModal.jsx';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.setState({
      show: true
    });
  }

  closeModal() {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div>
        <button class='review-show-button' onClick={this.showModal}>Submit Review</button>
        <ReviewFormModal show={this.state.show} closeModal={this.closeModal}/>
      </div>
    );
  }
}

export default ReviewForm;