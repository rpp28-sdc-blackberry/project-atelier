import React from 'react';
import ItemCard from './ItemCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import { preventScroll } from './helpers.js';

class ItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      itemToCompare: '',
      mainProductFeatures: [],
      featuresToCompare: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e, features, name) {
    e.stopPropagation();

    if (!this.state.showModal) {
      this.setState({
        itemToCompare: name,
        featuresToCompare: features
      });
    }

    this.setState({
      showModal: !this.state.showModal
    }, preventScroll());
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

        <ComparisonModal
          showModal={this.state.showModal}
          toggleModal={this.toggleModal}
          mainProduct={[this.props.productName, this.props.productFeatures]}
          productToCompare={[this.state.itemToCompare, this.state.featuresToCompare]} />

        {this.props.items.map(itemId =>
          <ItemCard
            id={itemId}
            key={itemId}
            toggleModal={this.toggleModal}
            handleRelatedItemClick={this.props.handleRelatedItemClick} />)}

        <div id='rp-right-arrow' onClick={this.scrollLeft}>
          {'>'}
        </div>
      </div>
    );
  }
}

export default ItemsList;