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
    <div id='rp-comparison-modal' onClick={(e) => props.toggleModal(e)}>
      <p>Comparing</p>
      <h4 class='rp-modal-col-1'>{props.mainProduct[0]}</h4>
      <h4 class='rp-modal-col-3'>{props.productToCompare[0]}</h4>

      {allFeatures.map(feature =>
        <div>
          <div key={key++} class='rp-modal-col-1'>{feature.value}</div>
          <div key={key++} class='rp-modal-col-2'>{feature.feature}</div>
          <div key={key++} class='rp-modal-col-3'>{feature.compValue}</div>
        </div>
      )}
    </div>
  );
};

export default ComparisonModal;