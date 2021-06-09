import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        reviewslist
        {this.props.reviews.map(review => <ReviewTile review={review}/>)}
      </div>
    );
  }
}

export default ReviewsList;
