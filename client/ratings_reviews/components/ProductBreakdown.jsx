import React from 'react';
import CharacteristicBreakdown from './ChracteristicBreakdown.jsx';
import helpers from '../helpers.js';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chracterisctics: this.props.meta.characteristics
    };
  }

  render() {
    return (
      <div class='review-product-breakdown'>
        productbreakdown
        {this.props.meta.characteristics.map(characteristic => <CharacteristicBreakdown characteristic={characteristic}/>)}
      </div>
    );
  }
}

export default ProductBreakdown;