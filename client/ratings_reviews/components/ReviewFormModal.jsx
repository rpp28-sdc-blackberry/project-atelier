import React from 'react';
import $ from 'jquery';
import ReviewFormCharacterisics from './ReviewFormCharacteristics.jsx';
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
      showUploadPhotosButton: true,
      minimumBodyChar: 50
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let charactersLeft = this.state.minimumBodyChar;
    if (name.slice(0, 15) === 'characteristics') {
      let currentCharacteristics = this.state.characteristics;
      currentCharacteristics[e.target.className.toString()] = Number.parseInt(value);
      value = currentCharacteristics;
      name = name.slice(0, 15);
    }
    if (name === 'body') {
      let valueWithOutSpace = value.replace(/\s+/g, 'z');
      charactersLeft = valueWithOutSpace.length >= 50 ? 0 : 50 - valueWithOutSpace.length;
    }
    this.setState({
      [name]: value,
      minimumBodyChar: charactersLeft
    });
  }

  handlePhotoUpload(e) {
    $('#review-form-upload-photo').text('uploading...');
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
        }, () => {
          $('#review-form-upload-photo').text('');
        });
      }).catch((error) => {
        console.log(error);
        $('#review-form-upload-photo').text('upload failed');
      });
    };
    reader.readAsDataURL(photo);
  }

  handleStar(e) {
    let starValue = Number.parseInt(e.target.value);
    let starDescription = helpers.starDescriptions[starValue];
    this.setState({
      rating: starValue
    }, () => {
      $('#review-form-star-description').text(starDescription);
    });
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
    let properties = ['rating', 'summary', 'body', 'name', 'email', 'characteristics'];
    let warningText = '';
    for (let i = 0; i < properties.length; i++) {
      let property = properties[i];
      if ((property === 'rating' && this.state.rating === '') ||
      (property === 'summary' && (this.state.summary.replace(/\s+/g, 'z').length > 60 || this.state.summary === '')) ||
      (property === 'body' && this.state.minimumBodyChar !== 0) ||
      (property === 'name' && this.state.name === '') ||
      (property === 'email' && !helpers.validateEmail(this.state.email)) ||
      (property === 'characteristics' && Object.keys(this.state.characteristics).length !== Object.keys(this.props.meta.characteristics).length)) {
        warningText += '\n' + property;
        $('#review-form-' + property).text('required');
      } else {
        $('#review-form-' + property).text('');
      }
    }
    if (warningText !== '') {
      alert('You must enter the following:' + warningText);
    }
    return warningText === '';
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    let uploadedImagePreviews;
    if (this.state.photos.length !== 0) {
      uploadedImagePreviews = (
        <div>{this.state.photos.map(photo => <img class='review-photo review-thumbnail' src={photo}/>)}</div>
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
                <label className='review-form-sub-heading'>Overall rating*</label><span id='review-form-rating' class='review-form-invalid-warning'></span>
                <div id='review-form-star-container'>
                  <div className='review-form-star-rating'>
                    <input id='star5' name='star' type='radio' value='5' className='radio-btn review-form-star-hide' onClick={this.handleStar}/><label for='star5' >☆</label>
                    <input id='star4' name='star' type='radio' value='4' className='radio-btn review-form-star-hide' onClick={this.handleStar}/><label for='star4' >☆</label>
                    <input id='star3' name='star' type='radio' value='3' className='radio-btn review-form-star-hide' onClick={this.handleStar}/><label for='star3' >☆</label>
                    <input id='star2' name='star' type='radio' value='2' className='radio-btn review-form-star-hide' onClick={this.handleStar}/><label for='star2' >☆</label>
                    <input id='star1' name='star' type='radio' value='1' className='radio-btn review-form-star-hide' onClick={this.handleStar}/><label for='star1' >☆</label>
                    <div className="review-form-star-clear"></div>
                  </div>
                  <div id='review-form-star-description'></div>
                </div>
              </div>
              <div id='review-form-recommend'>
                <label className='review-form-sub-heading'>Do you recommend this product?*</label>
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
                <label className='review-form-sub-heading'>Characteristics*</label><span id='review-form-characteristics' className='review-form-invalid-warning'></span>
                <div className='review-form-all-characteristics'>
                  {helpers.formatCharacteristics(this.props.meta.characteristics).map(characteristic => <ReviewFormCharacterisics characteristic={characteristic} handleChange={this.handleChange}/>)}
                </div>
              </div>
              <div>
                <label className='review-form-sub-heading'>Review summary*</label><span id='review-form-summary' className='review-form-invalid-warning'></span>
                <div>
                  <input name='summary' type='text' maxlength='60' size='70' placeholder='Example: Best purchase ever!' value={this.state.summary} onChange={this.handleChange}></input>
                </div>
              </div>
              <div>
                <label className='review-form-sub-heading'>Review body*</label><span id='review-form-body' className='review-form-invalid-warning'></span>
                <div>
                  <textarea id='review-form-body' name='body' rows='10' cols='70' placeholder='Why did you like the product or not?' value={this.state.body} onChange={this.handleChange}></textarea>
                </div>
                <span className='review-form-characteristic-description'>Mininum required character left: {this.state.minimumBodyChar}</span>
              </div>
              <div>
                <label className='review-form-sub-heading'>Your uploaded photo(s):</label>
                {uploadedImagePreviews}
                <div>
                  <div><input type='file' name='photo' accept='image/*' value={this.state.photo} id='review-uploaded-photo' onChange={this.handlePhotoUpload} hidden={!this.state.showUploadPhotosButton} style={{'display': 'none'}}></input></div>
                  <div><label id='review-form-upload-photo-button' className='review-clickable' type='button' for='review-uploaded-photo'>Upload Photo</label><span id='review-form-upload-photo' className='review-form-invalid-warning'></span></div>
                </div>
              </div>
              <div>
                <label className='review-form-sub-heading'>Your nickname*</label><span id='review-form-name' className='review-form-invalid-warning'></span>
                <div>
                  <input name='name' type='text' maxlength='40' size='50' placeholder='Example: jackson11' value={this.state.name} onChange={this.handleChange}></input>
                </div>
                <span className='review-form-characteristic-description'>For privacy reasons, do not use your full name or email address</span>
              </div>
              <div>
                <label className='review-form-sub-heading'>Your email*</label><span id='review-form-email' className='review-form-invalid-warning'></span>
                <div>
                  <input name='email' type='text' maxlength='40' size='50' placeholder='Example: jackson11@email.com' value={this.state.email} onChange={this.handleChange}></input>
                </div>
                <span className='review-form-characteristic-description'>For authentication reasons, you will not be emailed</span>
              </div>
              <div>
                <button className='review-button'>SUBMIT REVIEW</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReviewFormModal;