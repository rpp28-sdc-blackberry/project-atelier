import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import OutfitCard from './OutfitCard.jsx';
import { defineMainProduct } from './helpers.js';

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
    if (prevProps.info.id !== this.props.info.id) { this.initialize(); }
  }

  initialize() {
    let mainProduct = defineMainProduct(this.props.info, this.props.defaultStyle);

    this.setState({
      mainProduct: mainProduct
    });

    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]));
    } else {
      let storedOutfits = JSON.parse(localStorage.getItem('outfits'));
      this.setState({ outfits: storedOutfits });
    }
  }

  addToOutfit() {
    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    let mainProduct = this.state.mainProduct;
    let foundDuplicate = false;

    storedOutfits.forEach(outfit => {
      if (outfit.id === mainProduct.id) {
        foundDuplicate = true;
      }
    });

    if (!foundDuplicate) {
      storedOutfits.push(mainProduct);
      localStorage.setItem('outfits', JSON.stringify(storedOutfits));
      this.setState({ outfits: storedOutfits });
    }
  }

  removeFromOutfit(e) {
    e.stopPropagation();
    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    let removedItemId = parseInt(e.target.parentNode.id);

    if (storedOutfits) {
      let currentOutfits = this.state.outfits;
      let updatedOutfits = [];

      currentOutfits.forEach(outfit => {
        if (outfit.id !== removedItemId) { updatedOutfits.push(outfit); }
      });

      localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
      this.setState({ outfits: updatedOutfits });
    }
  }

  scrollLeft(e) {
    e.target.parentNode.scrollLeft += 320;
  }

  scrollRight(e) {
    e.target.parentNode.scrollLeft -= 320;
  }

  render() {
    return (
      <div className='rp-strip'>
        <div id='rp-left-arrow' onClick={this.scrollRight}>
          {'<'}
        </div>

        <AddToOutfit addToOutfit={this.addToOutfit} />
        {this.state.outfits.length !== 0 && this.state.outfits.map(outfit => <OutfitCard
          key={outfit.id}
          productInfo={outfit}
          removeFromOutfit={this.removeFromOutfit}
          handleRelatedItemClick={this.props.handleRelatedItemClick} />)}

        <div id='rp-right-arrow' onClick={this.scrollLeft}>
          {'>'}
        </div>
      </div>
    );
  }
}

export default OutfitList;