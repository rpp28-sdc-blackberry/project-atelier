import React from 'react';

const ProductInfo = (props) => {

  return (
    <div id="productInfo">
      <div id="productCategory">Category: {props.info.category}</div>
      <div id="productTitle">Title: {props.info.name}</div>
      <div id="productPrice">$$$ {props.info.default_price}</div>
    </div>
  );
};

export default ProductInfo;