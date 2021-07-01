import React from 'react';

const ProductInfo = (props) => {
  if (props.info && props.selectedStyle) {
    const priceState = props.selectedStyle.sale_price === null ? 'regular' : 'sale';
    return (
      <div id="productInfo">
        <div id="productCategory">{(props.info.category).toUpperCase()}</div>
        <div id="productTitle">{props.info.name}</div>
        {priceState === 'sale' ? <span id="productSalePrice">${props.selectedStyle.sale_price}</span> : null}
        <span id="productPrice" className={priceState}>${props.selectedStyle.original_price}</span>
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