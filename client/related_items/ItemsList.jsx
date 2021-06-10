import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import ItemCard from './ItemCard.jsx';

const ItemsList = (props) => (
  <div>
    {props.listType === 'relatedItems' ?
      <div>
        {props.items.map(itemId => <ItemCard id={itemId} key={itemId} />)}
      </div> :
      <AddToOutfit /> }
  </div>
);

export default ItemsList;