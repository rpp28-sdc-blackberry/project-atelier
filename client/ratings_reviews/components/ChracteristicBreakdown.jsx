import React from 'react';
import helpers from '../helpers.js';

const CharacteristicBreakdown = (props) => (
  <div>
    <label>{props.characteristic.name}</label><br></br>
    <div class='review-product-breakdown-container'>
      <div>
        <input class='review-product-breakdown-bar' type='range' min='1' max='5' value={props.characteristic.value}></input>
      </div>
      <div class='review-product-breakdown-description-container'>
        {[1, 3, 5].map(key =>
          <span class='review-product-breakdown-description'>{helpers.productCharacteristics[props.characteristic.name][key]}</span>
        )}
      </div>
    </div>
  </div>
);

export default CharacteristicBreakdown;