import React from 'react';

class ReviewFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="review-form-modal" onClick={this.props.closeModal}>
        <div className="review-form-modal-content" onClick={e => e.stopPropagation()}>
          <div>Write Your Review</div>
          <div>About the [Product Name Here]</div>
          <div>Overall rating* (drop down)</div>
          <div>Do you recommend this product?* (radio button)</div>
          <div>Characteristics* (array of five radio buttons)</div>
          <div>Review summary* (text input)</div>
          <div>Review body* (text area)</div>
          <div>Upload your photos</div>
          <div>What is your nickname?* (text input)</div>
          <div>Your email* (text input)</div>
          <div>Submit review (button)</div>
        </div>
      </div>
    );
  }
}

export default ReviewFormModal;