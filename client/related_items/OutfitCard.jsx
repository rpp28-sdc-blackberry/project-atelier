import React from 'react';

const OutfitCard = (props) => (
  <div className='relatedItemCard' id={props.productInfo.id}>
    <div id="action" onClick={(e) => props.removeFromOutfit(e)}>Remove</div>
    <img id="thumbnail" src={props.productInfo.thumbnailUrl}></img>
    <p id="category">{props.productInfo.category}</p>
    <p id="name">{props.productInfo.name}</p>
    <p id="price">{props.productInfo.price}</p>
    <p id="rating">{props.productInfo.rating}</p>
  </div>
);

export default OutfitCard;