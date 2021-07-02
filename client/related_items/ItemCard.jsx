import React from 'react';
import { getProductInfo, getProductStyles, getProductRatings, findDefaultStyle, hideArrows } from './helpers.js';
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
              ? thumbnailUrl = '/images/no-image.png'
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

    const firstStrip = document.getElementsByClassName('rp-strip')[0];
    const secondStrip = document.getElementsByClassName('rp-strip')[1];
    hideArrows(firstStrip);
    hideArrows(secondStrip);
  }

  render() {
    let features = this.state.features;
    let name = this.state.name;

    return (
      <div className='rp-card' onClick={() => this.handleRelatedItemClick(this.props.id)}>
        <div id='rp-action-container'>
          <div className='rp-card-action' id='rp-card-compare' onClick={(e) => this.props.toggleModal(e, features, name)}> </div>
        </div>
        <div id='rp-thumbnail-container'>
          <img id='rp-thumbnail-image' alt={this.state.name} src={this.state.thumbnailUrl}></img>
        </div>
        <div id='rp-content-container'>
          <p id='rp-card-category'>{this.state.category}</p>
          <p id='rp-card-name'>{this.state.name}</p>
          <p id='rp-card-price'>${this.state.price}</p>
          <span class='stars' style={{'--rating': this.state.rating}}></span>
        </div>
      </div>
    );
  }
}

export default ItemCard;