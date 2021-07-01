import React from 'react';
import AddToBagButton from './AddToBagButton.jsx';
import DropdownTemplate from './DropdownTemplate.jsx';
const $ = require('jquery');

class AddToBag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: 'SELECT SIZE',
      availableSizes: null,
      availableQuantities: null,
      selectedQuantity: '-',
      showMessage: false,
      expandSizeSelectDropdown: false
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.updateMaxQuantity = this.updateMaxQuantity.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAddToBagSubmit = this.handleAddToBagSubmit.bind(this);
  }
  
  componentDidMount() {
    var sizesArr = [];
    for (var i = 0; i < this.props.availableSizes.length; i++) {
      sizesArr.push(this.props.availableSizes[i][0]);
    }
    console.log('sizesArr: ', sizesArr);

    var defaultSizeOption = this.props.availableSizes.length === 0 ? 'OUT OF STOCK' : 'SELECT SIZE';

    this.setState({
      selectedSize: defaultSizeOption,
      availableSizes: sizesArr
    });
  }

  handleSizeChange(size) {
    console.log('selectedSize: ', size);
    var maxQuantity = this.updateMaxQuantity(size);
    var quantityArr = [];
    for (var i = 1; i < (maxQuantity + 1); i++) {
      quantityArr.push(i);
    }
    console.log('quantityArr: ', quantityArr);
    this.setState({
      selectedSize: size,
      selectedQuantity: 1,
      showMessage: false,
      availableQuantities: quantityArr
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
    return maxAvailable;
  }

  handleQuantityChange(quantity) {
    var quantity = Number(quantity);
    this.setState({
      selectedQuantity: quantity
    });
  }

  handleAddToBagSubmit() {
    if (this.state.selectedSize !== 'SELECT SIZE') {
      for (var i = 0; i < this.props.availableSizes.length; i++) {
        if (this.props.availableSizes[i][0] === this.state.selectedSize) {
          var sku_id = this.props.availableSizes[i][2];
        }
      }
      var options = {
        "sku_id": sku_id,
        "count": this.state.selectedQuantity
      };
      // TODO: Add call to post data here & to server
      fetch(`/cart`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(options)
      })
        .then((response) => {
          console.log('Posted cart!');
          this.setState({
            showMessage: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      $('.addtobag-size-dd-header').trigger('click');
      this.setState({
        showMessage: true
      });
    }
  }

  render() {
    return (
      <div id="addtobag">
        {this.state.showMessage ? <div id="errorMessage">Please select size.</div> : null}
        <br></br>
        <div className="addtobag">
          <div className="addtobag-dropdowns">
            <DropdownTemplate 
              title={this.state.selectedSize}
              selectName="size"
              list={this.state.availableSizes}
              resetThenSet={this.handleSizeChange}
            />
            <DropdownTemplate
              title={this.state.selectedQuantity}
              selectName="quantity" 
              list={this.state.availableQuantities}
              resetThenSet={this.handleQuantityChange}
            />
          </div>
          <div className="addtobag-buttons">
            {this.state.selectedSize === 'OUT OF STOCK' ? 
              null :
              <AddToBagButton 
                handleAddToBagSubmit={this.handleAddToBagSubmit}
                availableSizes={this.props.availableSizes}/>         
            }
            <button id="starButton">&#9734;</button>
          </div>
        </div>
      </div>
    );
  }
}


export default AddToBag;