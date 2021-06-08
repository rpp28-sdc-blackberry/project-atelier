import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import ItemCard from './ItemCard.jsx';

//This one should conditionally render AddToOutfit or ComparisonModal (which will render on click) - likely doesn't need state?
const ItemsList = (props) => (
  <div>
    <AddToOutfit />
    <ItemCard />
  </div>
);

export default ItemsList;