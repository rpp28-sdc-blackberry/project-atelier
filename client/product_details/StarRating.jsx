import React from 'react';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.averageRating) {
      return (
        <div id="starRating">
          <span className="stars" style={{'--rating': this.props.averageRating}}></span>
          <a href="#review-overall-container" className="overview-reviews-link">Read all {this.props.reviewsNumber} reviews</a>
        </div>
      );
    } else {
      return (
        <div id="starRating">
          <span className="stars" style={{'--rating': 0}}></span>
        </div>
      );
    }
  }
}

export default StarRating;