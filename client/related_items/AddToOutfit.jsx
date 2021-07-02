import React from 'react';

const AddToOutfit = (props) => (
  <div id='rp-add-to-outfit-card' onClick={props.addToOutfit}>
    <div id='add-to-outfit-action'> </div>
    <div id='add-to-outfit-text'>ADD TO OUTFIT</div>
  </div>
);

export default AddToOutfit;