import React from 'react';
import AddToBagButton from './AddToBagButton.jsx';
import $ from 'jquery';

class AddToBag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: 'SELECT SIZE',
      selectedQuantity: '-',
      maxQuantity: 1,
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.updateMaxQuantity = this.updateMaxQuantity.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAddToBagSubmit = this.handleAddToBagSubmit.bind(this);
  }

  handleSizeChange(e) {
    var selectedSize = e.target.value;
    this.updateMaxQuantity(selectedSize);
    this.setState({
      selectedSize: selectedSize,
      selectedQuantity: 1
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
  
  handleQuantityChange(e) {
    var selectedQuantity = e.target.value;
    this.setState({
      selectedQuantity: selectedQuantity
    });
  }

  handleAddToBagSubmit() {
    if (this.state.selectedSize !== 'SELECT SIZE') {
      for (var i = 0; i < this.props.availableSizes.length; i++) {
        if (this.props.availableSizes[i][0] === this.state.selectedSize) {
          var sku_id = this.props.availableSizes[i][2];
          console.log('styleId: ', sku_id);
        }
      }
      var options = {
        "sku_id": sku_id,
        "count": this.state.selectedQuantity
      };
      // TODO: Add call to post data here & to server
      fetch(`http://localhost:8080/cart`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(options)
      })
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // TODO: Add code to open the size dropdown and display message above
      // stating "Please select Size"
      console.log('Please select size');
    }
  }

  render() {
    var quantityArr = [];
    for (var i = 1; i < (this.state.maxQuantity + 1); i++) {
      quantityArr.push(i);
    }
    var defaultSizeOption = this.props.availableSizes.length === 0 ? 'OUT OF STOCK' : 'SELECT SIZE';
    var defaultQuantity = this.state.selectedSize === 'SELECT SIZE' ? '-' : 1;

    return (
      <div id="addToBag">
        <select name={this.state.selectedSize} id="selectSize" placeholder={defaultSizeOption} onChange={this.handleSizeChange}>
          <option value={defaultSizeOption}>{defaultSizeOption}</option>
          {this.props.availableSizes.map((size) => <option value={size[0]}>{size[0]}</option>)}
        </select>
        <select name={this.state.selectedQuantity} id="selectQuantity" placeholder={defaultQuantity} onChange={this.handleQuantityChange}>
          {this.state.selectedSize === 'SELECT SIZE' ? <option value="-">-</option> : null}
          {quantityArr.map((quantity) => <option value={quantity}>{quantity}</option>)}
        </select><br></br>
        <AddToBagButton 
          handleAddToBagSubmit={this.handleAddToBagSubmit}
          availableSizes={this.props.availableSizes}/>
        <button id="starButton">&#9734;</button>
      </div>
    );
  }
}


export default AddToBag;