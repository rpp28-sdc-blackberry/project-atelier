import React from 'react';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="productInfo">
        <div id="productCategory">Category</div>
        <div id="productTitle">Title</div>
        <div id="productPrice">$$$</div>
      </div>
    );
  }
}

export default ProductInfo;