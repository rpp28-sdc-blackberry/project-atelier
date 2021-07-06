import React from 'react';
import ReviewFormModal from './ReviewFormModal.jsx';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        <button id='review-form-add-button' class='review-button' onClick={this.toggleModal}>ADD A REVIEW +</button>
        <ReviewFormModal show={this.state.show} toggleModal={this.toggleModal} productName={this.props.productName} meta={this.props.meta}/>
      </div>
    );
  }
}

export default ReviewForm;