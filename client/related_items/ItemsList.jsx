import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import ItemCard from './ItemCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

class ItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      itemToCompare: '',
      mainProductFeatures: [],
      featuresToCompare: [],
      outfits: [],
      mainProduct: {
        thumbnailUrl: '',
        category: '',
        name: '',
        price: '',
        rating: '',
        id: ''
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.listType === 'yourOutfit') {
      if (prevProps.info.id !== this.props.info.id) {
        this.initialize();
      }
    }
  }

  initialize() {
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
        rating: '4.5',
        id: info.id
      };

      this.setState({
        mainProduct: mainProduct
      });
    }

    let outfits = JSON.parse(window.localStorage.getItem('outfits'));
    if (outfits !== null) {
      this.setState({ outfits: outfits });
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

  addToOutfit() {
    let storage = window.localStorage;
    let mainProduct = this.state.mainProduct;
    let outfits = [];
    let foundDuplicate = false;
    let currentOutfits = JSON.parse(storage.getItem('outfits'));

    if (currentOutfits === null) {
      outfits.push(mainProduct);
      storage.setItem('outfits', JSON.stringify(outfits));
    } else {
      outfits = JSON.parse(storage.getItem('outfits'));
      outfits.forEach(outfit => {
        if (outfit.id === mainProduct.id) {
          foundDuplicate = true;
        }
      });

      if (!foundDuplicate) {
        outfits.push(mainProduct);
        storage.setItem('outfits', JSON.stringify(outfits));
      }
    }

    if (!foundDuplicate) { this.setState({ outfits: outfits }); }
  }

  removeFromOutfit(e) {
    let storage = window.localStorage;
    let storedOutfits = JSON.parse(storage.getItem('outfits'));
    let removedItemId = parseInt(e.target.parentNode.id);

    if (storedOutfits) {
      let currentOutfits = this.state.outfits;
      let updatedOutfits = [];

      currentOutfits.forEach(outfit => {
        if (outfit.id !== removedItemId) { updatedOutfits.push(outfit); }
      });

      storage.setItem('outfits', JSON.stringify(updatedOutfits));
      this.setState({ outfits: updatedOutfits });
    }
  }

  render() {
    return (
      this.props.listType === 'relatedItems'
        ? <div className='relatedItemsStrip'>
          <ComparisonModal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
            mainProduct={[this.props.productName, this.props.productFeatures]}
            productToCompare={[this.state.itemToCompare, this.state.featuresToCompare]}/>

          {this.props.items.map(itemId =>
            <ItemCard
              id={itemId}
              key={itemId}
              toggleModal={this.toggleModal}
              handleRelatedItemClick={this.props.handleRelatedItemClick} />)}
        </div>

        : <div className='relatedItemsStrip'>
          <AddToOutfit addToOutfit={this.addToOutfit} />
          {this.state.outfits.length !== 0 && this.state.outfits.map(outfit => <OutfitCard
            key={outfit.id}
            productInfo={outfit}
            removeFromOutfit={this.removeFromOutfit}
            handleRelatedItemClick={this.props.handleRelatedItemClick} />)}
        </div>
    );
  }
}

export default ItemsList;