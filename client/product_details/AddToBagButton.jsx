import React from 'react';

const AddToBagButton = (props) => {
  // if there is no stock, the button will not render
  if (props.availableSizes.length !== 0) {
    return (
      <button id="addToBagButton" onClick={props.handleAddToBagSubmit}>ADD TO BAG</button>
    );
  }
  return null;
};
export default AddToBagButton;