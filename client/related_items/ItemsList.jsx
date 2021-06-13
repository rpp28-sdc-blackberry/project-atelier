import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import ItemCard from './ItemCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

class ItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      itemToCompare: '',
      featuresToCompare: [],
      mainProduct: {
        thumbnailUrl: '',
        category: '',
        name: '',
        price: '',
        rating: ''
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultStyle && this.props.info) {

      let price, thumbnailUrl, defaultStyle, info, mainProduct;

      defaultStyle = this.props.defaultStyle;
      info = this.props.info;

      if (defaultStyle.sale_price === null) {
        price = defaultStyle.original_price;
      } else { price = defaultStyle.sale_price; }

      if (defaultStyle.photos[0].thumbnail_url === null) {
        thumbnailUrl = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081';
      } else { thumbnailUrl = defaultStyle.photos[0].thumbnail_url; }

      mainProduct = {
        thumbnailUrl: thumbnailUrl,
        category: info.category,
        name: info.name,
        price: price,
        rating: '4.5'
      };

      this.setState({
        mainProduct: mainProduct
      });
    }
  }

  toggleModal(features, name) {
    if (!this.state.showModal) {
      this.setState({
        itemToCompare: name,
        featuresToCompare: features
      });
    }

    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      this.props.listType === 'relatedItems'
        ? <div className='relatedItemsStrip'>
          <ComparisonModal showModal={this.state.showModal} toggleModal={this.toggleModal} features={this.state.featuresToCompare} name={this.state.itemToCompare} />
          {this.props.items.map(itemId => <ItemCard id={itemId} key={itemId} toggleModal={this.toggleModal} />)}
        </div>
        : <div className='relatedItemsStrip'>
          <AddToOutfit />
        </div>
    );
  }
}

export default ItemsList;