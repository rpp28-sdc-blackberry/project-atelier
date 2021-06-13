import React from 'react';

const AddToOutfit = (props) => (
  <div id='addToOutfitCard' onClick={props.addToOutfit}>
    <p>+</p>
    <p>Add to Outfit</p>
  </div>
);

export default AddToOutfit;