import React from 'react';
import $ from 'jquery';
import CharacteristicBreakdown from './ChracteristicBreakdown.jsx';
import helpers from '../helpers.js';

const ProductBreakdown = (props) => {
  let characteristics = helpers.formatCharacteristics(props.meta.characteristics);
  if (!$.isEmptyObject(characteristics)) {
    return (
      <div className='review-product-breakdown'>
        {characteristics.map((characteristic, idx) =>
          <CharacteristicBreakdown key={idx} characteristic={characteristic}/>)}
      </div>
    );
  }
  return (
    <div></div>
  );
};

export default ProductBreakdown;