import React from 'react';

const ProductInfo = (props) => {
  if (props.info && props.selectedStyle) {
    return (
      <div id="productInfo">
        <div id="productCategory">{(props.info.category).toUpperCase()}</div>
        <div id="productTitle">{props.info.name}</div>
        <div id="productPrice">${props.info.default_price}</div>
        <div id="styleInfo"><b>STYLE ></b> {(props.selectedStyle.name).toUpperCase()}</div>
      </div>
    );
  } else {
    return (
      <div id="productInfo"></div>
    )
  }
};

export default ProductInfo;