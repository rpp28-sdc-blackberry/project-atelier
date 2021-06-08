import React from 'react';

class AddToBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="addToBag">
        <div>dropdown for Select Style</div>
        <div>dropdown for Quantity</div>
        <div>add to bag button</div>
        <div>star button</div>
      </div>
    );
  }
}

export default AddToBag;