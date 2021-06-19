import React from 'react';

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);

    this.removeFromOutfit = this.props.removeFromOutfit.bind(this);
  }

  render() {
    return (
      <div className='relatedItemCard' onClick={() => this.removeFromOutfit(this)}>
        <div id="action">Action</div>
        <img id="thumbnail" src={this.props.productInfo.thumbnailUrl}></img>
        <p id="category">{this.props.productInfo.category}</p>
        <p id="name">{this.props.productInfo.name}</p>
        <p id="price">{this.props.productInfo.price}</p>
        <p id="rating">{this.props.productInfo.rating}</p>
      </div>
    );
  }
}

export default OutfitCard;