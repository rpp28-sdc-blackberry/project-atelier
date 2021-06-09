import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageRating: 0
    };
  }

  render() {
    return (
      <div class='review-rating-breakdown'>
        ratingbreakdown
      </div>
    );
  }
}

export default RatingBreakdown;