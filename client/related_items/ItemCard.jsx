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
      rating: ''
    };
  }

  componentDidMount() {
    helpers.getProductInfo(this.props.id)
      .then(productInfo => this.setState({
        thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzyCEFZ5wFBTJr1hHefx4EMctvo5ukvxnjA&usqp=CAU',
        category: productInfo.category,
        name: productInfo.name,
        price: productInfo.default_price,
        rating: '4.5'
      }))
      .then(() => helpers.getProductStyles(this.props.id)
        .then(productStyles => console.log(productStyles)));
  }

  render() {
    return (
      <div>
        <div id="action">Action</div>
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