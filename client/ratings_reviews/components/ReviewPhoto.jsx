import React from 'react';
import Modal from './ReviewPhotoModal.jsx';

class ReviewPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showPhotos
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
      <React.Fragment>
        <img onClick={this.toggleModal} class='review-photo' src={this.props.photo.url}/>
        <Modal show={this.state.show} closeModal={this.toggleModal} url={this.props.photo.url}/>
      </React.Fragment>
    );
  }
}

export default ReviewPhoto;