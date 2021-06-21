import React from 'react';
import $ from 'jquery';

class ReviewFormPhotoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      e: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      photo: e.target.value,
      e: e
    });
  }

  handleSubmit() {
    this.props.handleChange(this.state.e);
    this.setState({
      photo: ''
    }, this.props.toggleModal);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="review-form-photo-modal" onClick={this.props.toggleModal}>
        <div className="review-form-photo-modal-content" onClick={e => e.stopPropagation()}>
          <div>Please insert the image URL:</div>
          <div><input name='photo' type='text' placeholder='Image URL here' onChange={this.handleChange} value={this.state.photo}></input></div>
          <button class='review-button' type='button' onClick={this.handleSubmit}>Add Image</button>
        </div>
      </div>
    );
  }
}

export default ReviewFormPhotoModal;