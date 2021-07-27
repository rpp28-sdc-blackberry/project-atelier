import React from 'react';
import helpers from '../helpers.js';

const CharacteristicBreakdown = (props) => {
  if (props.characteristic.value !== null) {
    return (
      <div>
        <label className='review-product-characteristic-name'>{props.characteristic.name}</label><br></br>
        <div className='review-product-breakdown-container'>
          <div>
            <input className='review-product-breakdown-bar' type='range' min='1' max='5' value={props.characteristic.value} readOnly></input>
          </div>
          <div className='review-product-breakdown-description-container'>
            {[1, 3, 5].map((key, idx) =>
              <span key={idx} className='review-product-breakdown-description'>{helpers.productCharacteristics[props.characteristic.name][key]}</span>
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