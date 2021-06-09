import React from 'react';
import Modal from './ReviewPhotoModal.jsx';

class ReviewPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showPhotos
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
      <React.Fragment>
        <img onClick={this.showModal} class='review-photo' src={this.props.photo.url}/>
        <Modal show={this.state.show} closeModal={this.closeModal} url={this.props.photo.url}/>
      </React.Fragment>
    );
  }
}

export default ReviewPhoto;