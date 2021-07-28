import React from 'react';
import PhotoModal from './ReviewPhotoModal.jsx';

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
        <img onClick={this.toggleModal} className='review-photo' src={this.props.photo.url}/>
        <PhotoModal show={this.state.show} toggleModal={this.toggleModal} url={this.props.photo.url}/>
      </React.Fragment>
    );
  }
}

export default ReviewPhoto;