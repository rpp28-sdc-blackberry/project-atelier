import React from 'react';
import helpers from '../helpers.js';

class ReviewFormCharacterisics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    var characteristicDescriptions;
    if (this.props.characteristic.name === 'Size') {
      characteristicDescriptions = (
        <div class='review-form-characteristic-radio'>
          <span>A size too small</span>
          <span>½ a size too small</span>
          <span>Perfect</span>
          <span>½ a size too big</span>
          <span>A size too wide</span>
        </div>);
    }
    if (this.props.characteristic.name === 'Width') {
      characteristicDescriptions = (
        <div class='review-form-characteristic-radio'>
          <span>Too narrow</span>
          <span>Slightly narrow</span>
          <span>Perfect</span>
          <span>Slightly wide</span>
          <span>Too wide</span>
        </div>);
    }
    if (this.props.characteristic.name === 'Comfort') {
      characteristicDescriptions = (
        <div class='review-form-characteristic-radio'>
          <span>Uncomfortable</span>
          <span>Slightly uncomfortable</span>
          <span>Ok</span>
          <span>Comfortable</span>
          <span>Perfect</span>
        </div>);
    }
    if (this.props.characteristic.name === 'Quality') {
      characteristicDescriptions = (
        <div class='review-form-characteristic-radio'>
          <span>Poor</span>
          <span>Below average</span>
          <span>What I expected</span>
          <span>Pretty great</span>
          <span>Perfect</span>
        </div>);
    }
    if (this.props.characteristic.name === 'Length') {
      characteristicDescriptions = (
        <div class='review-form-characteristic-radio'>
          <span>Runs short</span>
          <span>Runs slightly short</span>
          <span>Perfect</span>
          <span>Runs slightly long</span>
          <span>Runs long</span>
        </div>);
    }
    if (this.props.characteristic.name === 'Fit') {
      characteristicDescriptions = (
        <div class='review-form-characteristic-radio'>
          <span>Runs tight</span>
          <span>Runs slightly tight</span>
          <span>Perfect</span>
          <span>Runs slightly long</span>
          <span>Runs long</span>
        </div>);
    }

    return (
      <div class='review-form-characteristic-radio-container'>
        <div>
          <div>{this.props.characteristic.name}</div>
          <div class='review-form-characteristic-radio'>
            {[...Array(5).keys()].map(key =>
              <span>
                <input type='radio' name={'characteristics' + this.props.characteristic.name} value={key + 1} class={this.props.characteristic.id} onChange={this.props.handleChange}></input>
                <label for={'characteristics' + this.props.characteristic.name}>{key + 1}</label>
              </span>
            )}
          </div>
          {characteristicDescriptions}
        </div>
      </div>
    );
  }
}

export default ReviewFormCharacterisics;