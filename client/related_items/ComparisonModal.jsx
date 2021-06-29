import React from 'react';
import { findComparisonFeatures } from './helpers.js';

const ComparisonModal = (props) => {
  if (!props.showModal) {
    return null;
  }

  let key = 0;
  let mainFeatures = props.mainProduct[1];
  let comparisonFeatures = props.productToCompare[1];

  let allFeatures = findComparisonFeatures(mainFeatures, comparisonFeatures);

  return (
    <div id='rp-comparison-modal-background' onClick={(e) => props.toggleModal(e)}>
      <div id='rp-comparison-modal'>
        <h4>COMPARING</h4>
        <div className='rp-modal-product-names'>
          <p>{props.mainProduct[0]}</p>
          <p>{props.productToCompare[0]}</p>
        </div>

        {allFeatures.map(feature =>
          feature.product === 'main'
            ?
            <div className='rp-modal-row'>
              <div key={key++} className='rp-modal-col-1'>{feature.value}</div>
              <div key={key++} className='rp-modal-col-2'>{feature.feature}</div>
              <div key={key++} className='rp-modal-col-3'>{feature.compValue}</div>
            </div>
            :
            <div className='rp-modal-row'>
              <div key={key++} className='rp-modal-col-1'>{feature.compValue}</div>
              <div key={key++} className='rp-modal-col-2'>{feature.feature}</div>
              <div key={key++} className='rp-modal-col-3'>{feature.value}</div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonModal;