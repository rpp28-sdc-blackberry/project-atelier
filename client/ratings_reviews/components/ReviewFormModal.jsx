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
      photo: '',
      show: false,
      showUploadPhotosButton: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.validateForm = this.validateForm.bind(this);
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
      console.log('photo: ', value);
    }
    let showUploadPhotosButton = this.state.photoCount + photoIncrement < 5;
    this.setState({
      [name]: value,
      photoCount: this.state.photoCount + photoIncrement,
      showUploadPhotosButton: showUploadPhotosButton
    });
  }

  handlePhotoUpload(e) {
    let photo = document.getElementById('review-uploaded-photo').files[0];
    let reader = new FileReader();
    let dataURI;
    reader.onload = () => {
      dataURI = reader.result;
      $.ajax({
        url: '/review/image',
        method: 'POST',
        dataType: 'text',
        data: {
          dataURI: dataURI
        }
      }).then((cloudinaryURL) => {
        let showUploadPhotosButton = this.state.photoCount + 1 < 5;
        let currentPhotos = this.state.photos;
        currentPhotos.push(cloudinaryURL);
        this.setState({
          photos: currentPhotos,
          photoCount: this.state.photoCount + 1,
          showUploadPhotosButton: showUploadPhotosButton
        });
      }).catch((error) => {
        console.log(error);
      });
    };
    reader.readAsDataURL(photo);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      return;
    }
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

  validateForm() {
    let valid = true;
    let properties = ['rating', 'summary', 'body', 'name', 'email', 'characteristics'];
    properties.forEach(property => {
      let invalidCharacteristics = (property === 'characteristics' && Object.keys(this.state[property]).length !== Object.keys(this.props.meta.characteristics).length);
      let invalidEmail = (property === 'email' && this.state[property].indexOf('@') === -1);
      if (invalidEmail || invalidCharacteristics || this.state[property] === '') {
        $('#review-form-' + property).text('*required');
        valid = false;
      } else {
        $('#review-form-' + property).text('');
      }
    });
    return valid;
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
      <div className='review-form-modal' onClick={this.props.closeModal}>
        <div className='review-form-modal-content' onClick={e => e.stopPropagation()}>
          <div className='review-form-modal-header'>
            <div>Write Your Review</div>
            <div>About the {this.props.productName}</div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className='review-form-modal-body'>
              <div>
                <label class='review-form-sub-heading'>Overall rating:</label><span id='review-form-rating' class='review-form-invalid-warning'></span>
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
                <label class='review-form-sub-heading'>Do you recommend this product?</label>
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
                <label class='review-form-sub-heading'>Characteristics:</label><span id='review-form-characteristics' class='review-form-invalid-warning'></span>
                <div class='review-form-all-characteristics'>
                  {helpers.formatCharacteristics(this.props.meta.characteristics).map(characteristic => <ReviewFormCharacterisics characteristic={characteristic} handleChange={this.handleChange}/>)}
                </div>
              </div>
              <div>
                <label class='review-form-sub-heading'>Review summary:</label><span id='review-form-summary' class='review-form-invalid-warning'></span>
                <div>
                  <input name='summary' type='text' maxlength='60' size='70' placeholder='Best Product Ever!' value={this.state.summary} onChange={this.handleChange}></input>
                </div>
              </div>
              <div>
                <label class='review-form-sub-heading'>Review body:</label><span id='review-form-body' class='review-form-invalid-warning'></span>
                <div>
                  <textarea name='body' rows='5' cols='60' placeholder='Please share with us your thoughts on the product!' value={this.state.body} onChange={this.handleChange}></textarea>
                </div>
              </div>
              <div>
                <label class='review-form-sub-heading'>Your uploaded photo(s):</label>
                {uploadedImagePreviews}
                {/* <div><button class='review-button' type='button' onClick={this.toggleModal} hidden={!this.state.showUploadPhotosButton}>Upload Photo</button></div>
                <ReviewFormPhotoModal show={this.state.show} toggleModal={this.toggleModal} handleChange={this.handleChange}/> */}
                <div>
                  <div><input type='file' name='photo' accept='image/*' value={this.state.photo} id='review-uploaded-photo' onChange={this.handlePhotoUpload} hidden={!this.state.showUploadPhotosButton} style={{'display': 'none'}}></input></div>
                  <div><label class='review-clickable' type='button' for='review-uploaded-photo'>Upload Photo</label></div>
                </div>
              </div>
              <div>
                <label class='review-form-sub-heading'>Your nickname:</label><span id='review-form-name' class='review-form-invalid-warning'></span>
                <div>
                  <input name='name' type='text' maxlength='40' size='50' placeholder='Your name here' value={this.state.name} onChange={this.handleChange}></input>
                </div>
              </div>
              <div>
                <label class='review-form-sub-heading'>Your email:</label><span id='review-form-email' class='review-form-invalid-warning'></span>
                <div>
                  <input name='email' type='text' maxlength='40' size='50' placeholder='Your email here' value={this.state.email} onChange={this.handleChange}></input>
                </div>
              </div>
              <div>
                <button class='review-button'>Submit Review</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReviewFormModal;