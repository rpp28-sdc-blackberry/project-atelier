import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewsList = (props) => (
  <div>
    reviewslist
    {props.reviews.map(review => <ReviewTile review={review}/>)}
  </div>
);

export default ReviewsList;
