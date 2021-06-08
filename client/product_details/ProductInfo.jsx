import React from 'react';

const ProductInfo = (props) => {

  return (
    <div id="productInfo">
      <div id="productCategory">Category: {props.category}</div>
      <div id="productTitle">Title: {props.name}</div>
      <div id="productPrice">$$$ {props.default_price}</div>
    </div>
  );
};

export default ProductInfo;