import React from 'react';
import { getProductInfo, getProductStyles, getProductRatings, findDefaultStyle } from './helpers.js';
import { computeAverageRating } from '../ratings_reviews/helpers.js';

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

    getProductRatings(this.props.id)
      .then(ratingsMeta => {
        let averageRating = computeAverageRating(ratingsMeta.ratings)[1];
        if (averageRating === 'NaN') { averageRating = '0.00'; }
        this.setState({
          rating: averageRating
        });
      });
  }

  render() {
    let features = this.state.features;
    let name = this.state.name;

    return (
      <div className='relatedItemCard' onClick={() => this.handleRelatedItemClick(this.props.id)}>
        <div id="action" onClick={(e) => this.props.toggleModal(e, features, name)}>Compare</div>
        <img id="thumbnail" src={this.state.thumbnailUrl}></img>
        <p id="category">{this.state.category}</p>
        <p id="name">{this.state.name}</p>
        <p id="price">{this.state.price}</p>
        {/* <p id="rating">{this.state.rating}</p> */}
        <span class="stars" style={{'--rating': this.state.rating}}></span>
      </div>
    );
  }
}

export default ItemCard;