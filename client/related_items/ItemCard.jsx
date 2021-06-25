import React from 'react';
import { getProductInfo, getProductStyles, findDefaultStyle } from './helpers.js';

class ItemCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailUrl: '',
      category: '',
      name: '',
      price: '',
      rating: '',
      features: []
    };

    this.handleRelatedItemClick = this.props.handleRelatedItemClick.bind(this);
  }

  componentDidMount() {
    getProductInfo(this.props.id)
      .then(productInfo => this.setState({
        category: productInfo.category,
        name: productInfo.name,
        rating: '4.5',
        features: productInfo.features
      }));

    getProductStyles(this.props.id)
      .then(productStyles => {
        findDefaultStyle(productStyles.results)
          .then(defaultStyle => {
            let price, thumbnailUrl;

            !defaultStyle.sale_price
              ? price = defaultStyle.original_price
              : price = defaultStyle.sale_price;

            !defaultStyle.photos[0].thumbnail_url
              ? thumbnailUrl = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081'
              : thumbnailUrl = defaultStyle.photos[0].thumbnail_url;

            this.setState({
              thumbnailUrl: thumbnailUrl,
              price: price
            });
          });
      });
  }

  render() {
    let features = this.state.features;
    let name = this.state.name;

    return (
      <div className='rp-card' onClick={() => this.handleRelatedItemClick(this.props.id)}>
        <div id='rp-action-container'>
          <div id='rp-card-action' onClick={(e) => this.props.toggleModal(e, features, name)}>Compare</div>
        </div>
        <div id='rp-thumbnail-container'>
          <img id='rp-thumbnail-image' src={this.state.thumbnailUrl}></img>
        </div>
        <div id='rp-content-container'>
          <p id='rp-card-category'>{this.state.category}</p>
          <p id='rp-card-name'>{this.state.name}</p>
          <p id='rp-card-price'>${this.state.price}</p>
          <p id='rp-card-rating'>{this.state.rating}</p>
        </div>
      </div>
    );
  }
}

export default ItemCard;