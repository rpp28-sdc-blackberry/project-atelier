import React from 'react';
import helpers from '../helpers.js';

class ReviewFormCharacterisics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div class='review-form-characteristic-radio-container'>
        <div>
          <div>{this.props.characteristic.name}</div>
          <div class='review-form-characteristic-radio'>
            {[...Array(5).keys()].map(key =>
              <div>
                <div>
                  <input type='radio' name={'characteristics' + this.props.characteristic.name} value={key + 1} class={this.props.characteristic.id} onChange={this.props.handleChange}></input>
                  <label for={'characteristics' + this.props.characteristic.name}>{key + 1}</label>
                </div>
                <div>
                  <span>{helpers.productCharacteristics[this.props.characteristic.name][key + 1]}</span>
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