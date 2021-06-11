import React from 'react';
import $ from 'jquery';
import CharacteristicBreakdown from './ChracteristicBreakdown.jsx';
import helpers from '../helpers.js';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: {}
    };
  }

  componentDidMount() {
    console.log('check1: ', this.props.meta.characteristics);
    this.setState({
      characteristics: helpers.formatCharacteristics(this.props.meta.characteristics)
    });
  }

  render() {
    console.log('check: ', this.state.characteristics);
    if (!$.isEmptyObject(this.state.characteristics)) {
      return (
        <div class='review-product-breakdown'>
          productbreakdown
          {this.state.characteristics.map(characteristic => <CharacteristicBreakdown characteristic={characteristic}/>)}
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default ProductBreakdown;