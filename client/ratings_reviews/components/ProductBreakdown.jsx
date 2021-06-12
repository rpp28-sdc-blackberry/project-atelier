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
    this.setState({
      characteristics: helpers.formatCharacteristics(this.props.meta.characteristics)
    });
  }

  render() {
    if (!$.isEmptyObject(this.state.characteristics)) {
      return (
        <div class='review-product-breakdown'>
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