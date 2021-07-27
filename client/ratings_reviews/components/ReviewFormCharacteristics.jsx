import React from 'react';
import $ from 'jquery';
import helpers from '../helpers.js';

class ReviewFormCharacterisics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.props.handleChange(e);
    let value = e.target.value;
    $('#' + this.props.characteristic.name).text(' - ' + helpers.productCharacteristics[this.props.characteristic.name][value]);
  }

  render() {
    return (
      <div className='review-form-characteristic-radio-container'>
        <div>
          <div className='review-form-characteristic-name'>
            {this.props.characteristic.name}
            <span className='review-form-characteristic-description' id={this.props.characteristic.name}> - none selected</span>
          </div>
          <div className='review-form-characteristic-radio'>
            {[...Array(5).keys()].map(key =>
              <div className='review-form-radio-description'>
                <div>
                  <input type='radio' name={'characteristics' + this.props.characteristic.name} value={key + 1} className={this.props.characteristic.id} onChange={this.handleSelect}></input>
                  <label for={'characteristics' + this.props.characteristic.name}>{key + 1}</label>
                </div>
                <div>
                  <span className='review-form-characteristic-description'>{helpers.productCharacteristics[this.props.characteristic.name][key + 1]}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewFormCharacterisics;