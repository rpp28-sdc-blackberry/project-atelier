import React from 'react';
import $ from 'jquery';
import ReviewFormCharacterisics from './ReviewFormCharacteristics.jsx';
import helpers from '../helpers.js';

class ReviewFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'product_id': 0,
      rating: '',
      summary: '',
      body: '',
      recommend: true,
      name: '',
      email: '',
      photos: [],
      characteristics: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      'product_id': this.props.meta.product_id
    });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name.slice(0, 15) === 'characteristics') {
      let currentCharacteristics = this.state.characteristics;
      currentCharacteristics[e.target.className.toString()] = Number.parseInt(value);
      value = currentCharacteristics;
      name = name.slice(0, 15);
    }
    console.log('name: ', name);
    console.log('value: ', value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let url = `reviews/product_id=${this.state.product_id}&rating=${this.state.rating}&summary=${this.state.summary}&body=${this.state.body}&recommend=${this.state.recommend}&name=${this.state.name}&email=${this.state.email}&photos=${this.state.photos}&characteristics=${this.state.characteristics}`;
    $.ajax({
      url: url,
      method: 'POST'
    }).then(() => {
      console.log('Posted review successfully!');
      this.props.closeModal();
    }).catch((error) => {
      console.log(error);
    });
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
              <label>Upload your photos</label>
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