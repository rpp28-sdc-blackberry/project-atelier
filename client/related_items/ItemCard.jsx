import React from 'react';
import helpers from './helpers.js';

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
    helpers.getProductInfo(this.props.id)
      .then(productInfo => this.setState({
        category: productInfo.category,
        name: productInfo.name,
        rating: '4.5',
        features: productInfo.features
      }));

    helpers.getProductStyles(this.props.id)
      .then(productStyles => {
        helpers.findDefaultStyle(productStyles.results)
          .then(defaultStyle => {
            let price, thumbnailUrl;

            if (defaultStyle.sale_price === null) {
              price = defaultStyle.original_price;
            } else { price = defaultStyle.sale_price; }

            if (defaultStyle.photos[0].thumbnail_url === null) {
              thumbnailUrl = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081';
            } else { thumbnailUrl = defaultStyle.photos[0].thumbnail_url; }

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
      <div className='relatedItemCard' onClick={() => this.handleRelatedItemClick(this.props.id)}>
        <div id="action" onClick={() => this.props.toggleModal(features, name)}>Action</div>
        <img id="thumbnail" src={this.state.thumbnailUrl}></img>
        <p id="category">{this.state.category}</p>
        <p id="name">{this.state.name}</p>
        <p id="price">{this.state.price}</p>
        <p id="rating">{this.state.rating}</p>
      </div>
    );
  }
}

export default ItemCard;