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
          <span class="stars" style={{'--rating': this.props.averageRating}}></span>
        </div>
      );
    } else {
      return (
        <div id="starRating">
          <span class="stars" style={{'--rating': 0}}></span>
        </div>
      );
    }
  }
}

export default StarRating;