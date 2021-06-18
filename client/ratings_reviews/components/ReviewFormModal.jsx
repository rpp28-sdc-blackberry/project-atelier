import React from 'react';
import $ from 'jquery';
import ReviewFormCharacterisics from './ReviewFormCharacteristics.jsx';
import ReviewFormPhotoModal from './ReviewFormPhotoModal.jsx';
import helpers from '../helpers.js';

class ReviewFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      summary: '',
      body: '',
      recommend: true,
      name: '',
      email: '',
      photos: [],
      characteristics: {},
      photoCount: 0,
      show: false,
      showUploadPhotosButton: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let photoIncrement = 0;
    if (name.slice(0, 15) === 'characteristics') {
      let currentCharacteristics = this.state.characteristics;
      currentCharacteristics[e.target.className.toString()] = Number.parseInt(value);
      value = currentCharacteristics;
      name = name.slice(0, 15);
    }
    if (name === 'photo' && value !== '') {
      let currentPhotos = this.state.photos;
      currentPhotos.push(value);
      value = currentPhotos;
      name = 'photos';
      photoIncrement++;
    }
    let showUploadPhotosButton = this.state.photoCount + photoIncrement < 5;
    this.setState({
      [name]: value,
      photoCount: this.state.photoCount + photoIncrement,
      showUploadPhotosButton: showUploadPhotosButton
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      'product_id': Number.parseInt(this.props.meta.product_id),
      rating: Number.parseInt(this.state.rating),
      summary: this.state.summary,
      body: this.state.body,
      recommend: JSON.parse(this.state.recommend),
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: this.state.characteristics
    };
    $.ajax({
      url: '/reviews',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data)
    }).then(() => {
      this.setState({
        rating: '',
        summary: '',
        body: '',
        recommend: true,
        name: '',
        email: '',
        photos: [],
        characteristics: {},
        photoCount: 0,
        show: false,
        showUploadPhotosButton: true
      }, this.props.closeModal);
    }).catch((error) => {
      console.log(error);
    });
  }

  toggleModal() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    let uploadedImagePreviews;
    if (this.state.photos.length !== 0) {
      uploadedImagePreviews = (
        <div>{this.state.photos.map(photo => <img class='review-photo' src={photo}/>)}</div>
      );
    }
    return (
      <div className="review-form-modal" onClick={this.props.closeModal}>
        <div className="review-form-modal-content" onClick={e => e.stopPropagation()}>
          <div>Write Your Review</div>
          <div>About the {this.props.productName}</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Overall rating</label>
              <div>
                <select name='rating' value={this.state.rating} onChange={this.handleChange}>
                  <option value=''>--Please choose an option--</option>
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
            </div>
            <div>
              <label>Do you recommend this product?</label>
              <div>
                <input type='radio' id='review-recommend-yes' name='recommend' value={true} checked onChange={this.handleChange}></input>
                <label for='recommend'>Yes</label>
              </div>
              <div>
                <input type='radio' id='review-recommend-no' name='recommend' value={false} onChange={this.handleChange}></input>
                <label for='recommend'>No</label>
              </div>
            </div>
            <div>
              <label>Characteristics</label>
              {helpers.formatCharacteristics(this.props.meta.characteristics).map(characteristic => <ReviewFormCharacterisics characteristic={characteristic} handleChange={this.handleChange}/>)}
            </div>
            <div>
              <label>Review summary</label>
              <div>
                <input name='summary' type='text' maxlength='60' size='70' placeholder='Best Product Ever!' value={this.state.summary} onChange={this.handleChange}></input>
              </div>
            </div>
            <div>
              <label>Review body</label>
              <div>
                <textarea name='body' rows='5' cols='60' placeholder='Please share with us your thoughts on the product!' value={this.state.body} onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div>
              <label>Your uploaded photo(s):</label>
              {uploadedImagePreviews}
              <div><button onClick={this.toggleModal} hidden={!this.state.showUploadPhotosButton}>Upload Photo</button></div>
              <ReviewFormPhotoModal show={this.state.show} toggleModal={this.toggleModal} handleChange={this.handleChange}/>
            </div>
            <div>
              <label>What is your nickname?</label>
              <div>
                <input name='name' type='text' maxlength='40' size='50' placeholder='Your name here' value={this.state.name} onChange={this.handleChange}></input>
              </div>
            </div>
            <div>
              <label>Your email</label>
              <div>
                <input name='email' type='text' maxlength='40' size='50' placeholder='Your email here' value={this.state.email} onChange={this.handleChange}></input>
              </div>
            </div>
            <div>
              <button>Submit Review</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReviewFormModal;