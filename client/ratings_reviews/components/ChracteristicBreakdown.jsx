import React from 'react';
import helpers from '../helpers.js';

const CharacteristicBreakdown = (props) => {
  if (props.characteristic.value !== null) {
    return (
      <div>
        <label class='review-product-characteristic-name'>{props.characteristic.name}</label><br></br>
        <div class='review-product-chracteristic-container'>
          <input class='review-product-breakdown-bar' type='range' min='1' max='5' value={props.characteristic.value}></input>
          <div class='review-product-description-container'>
            {[1, 3, 5].map(key =>
              <span>{helpers.productCharacteristics[props.characteristic.name][key]}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div></div>
  );
};

export default CharacteristicBreakdown;