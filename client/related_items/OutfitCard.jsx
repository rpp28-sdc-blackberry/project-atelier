import React from 'react';

const OutfitCard = (props) => {
  let rating = props.productInfo.rating;
  if (rating === 'NaN') { rating = '0.00'; }

  return (
    <div className='relatedItemCard' id={props.productInfo.id} onClick={() => props.handleRelatedItemClick(props.productInfo.id)}>
      <div id="action" onClick={(e) => props.removeFromOutfit(e)}>Remove</div>
      <img id="thumbnail" src={props.productInfo.thumbnailUrl}></img>
      <p id="category">{props.productInfo.category}</p>
      <p id="name">{props.productInfo.name}</p>
      <p id="price">{props.productInfo.price}</p>
      {/* <p id="rating">{props.productInfo.rating}</p> */}
      <span class="stars" style={{'--rating': props.productInfo.rating}}></span>
    </div>
  );
};

export default OutfitCard;