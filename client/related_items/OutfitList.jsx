import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import ItemCard from './ItemCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

class OutfitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    let price, thumbnailUrl, defaultStyle, info, mainProduct;
    defaultStyle = this.props.defaultStyle;
    info = this.props.info;

    if (!defaultStyle.sale_price) {
      price = defaultStyle.original_price;
    } else { price = defaultStyle.sale_price; }

    if (!defaultStyle.photos[0].thumbnail_url) {
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

    let outfits = JSON.parse(window.localStorage.getItem('outfits'));
    if (outfits !== null) {
      this.setState({ outfits: outfits });
    }
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
      <div className='relatedItemsStrip'>
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

export default OutfitList;