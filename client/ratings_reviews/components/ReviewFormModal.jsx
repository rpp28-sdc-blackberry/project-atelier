import React from 'react';
import ReviewFormCharacterisics from './ReviewFormCharacteristics.jsx';
import helpers from '../helpers.js';

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
          <div>About the {this.props.productName}</div>
          <div>
            <label>Overall rating:</label>
            <select>
              <option value=''>--Please choose an option--</option>
              <option value='5'>5</option>
              <option value='4'>4</option>
              <option value='3'>3</option>
              <option value='2'>2</option>
              <option value='1'>1</option>
            </select>
          </div>
          <div>
            <label>Do you recommend this product?</label>
            <div><input type='radio' id='review-recommend-yes' name='review-recommend-yes-no' value='true' checked></input><label for='review-recommend-yes'>Yes</label></div>
            <div><input type='radio' id='review-recommend-no' name='review-recommend-yes-no' value='false'></input><label for='review-recommend-no'>No</label></div>
          </div>
          <div>
            <label>Characteristics</label>
            {helpers.formatCharacteristics(this.props.meta.characteristics).map(characteristic => <ReviewFormCharacterisics characteristic={characteristic}/>)}
          </div>
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