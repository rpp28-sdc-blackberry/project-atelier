import React from 'react';

class AddToBag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: '',
      selectedQuantity: 1,
      maxQuantity: 1,
    };

    this.handleSizeSubmit = this.handleSizeSubmit.bind(this);
    this.updateMaxQuantity = this.updateMaxQuantity.bind(this);
    this.handleQuantitySubmit = this.handleQuantitySubmit.bind(this);
  }

  handleSizeSubmit(e) {
    var selectedSize = e.target.value;
    this.updateMaxQuantity(selectedSize);
    this.setState({
      selectedSize: selectedSize
    });
  }

  updateMaxQuantity(size) {
    var maxAvailable;
    for (var i = 0; i < this.props.availableSizes.length; i++) {
      if (this.props.availableSizes[i][0] === size) {
        maxAvailable = this.props.availableSizes[i][1];
      }
    }
    if (maxAvailable > 15) {
      maxAvailable = 15;
    }
    this.setState({
      maxQuantity: maxAvailable
    });
  }
  
  handleQuantitySubmit(e) {
    var selectedQuantity = e.target.value;
    this.setState({
      selectedQuantity: selectedQuantity
    });
  }

  render() {
    var quantities = () => {
      for (var i = 1; i < (this.state.maxQuantity + 1); i++) {
        return (
          <option value={i}>{i}</option>
        );
      }
    };

    return (
      <div id="addToBag">
        <select name={this.state.selectedSize} id="selectSize" placeholder="SELECT SIZE" onChange={this.handleSizeSubmit}>
          <option value="SELECT SIZE">SELECT SIZE</option>
          {this.props.availableSizes.map((size) => {
            return (
              <option value={size[0]}>{size[0]}</option>
            );
          })}
        </select>
        <select name={this.state.selectedQuantity} id="selectQuantity" placeholder={1} onChange={this.handleQuantitySubmit}>
          {quantities}
        </select>
        <div>add to bag button</div>
        <div>star button</div>
      </div>
    );
  }
}


export default AddToBag;