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
        <button id='review-form-add-button' class='review-button' onClick={this.showModal}>ADD A REVIEW +</button>
        <ReviewFormModal show={this.state.show} closeModal={this.closeModal} productName={this.props.productName} meta={this.props.meta}/>
      </div>
    );
  }
}

export default ReviewForm;