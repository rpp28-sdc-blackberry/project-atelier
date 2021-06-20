import React from 'react';
import ItemCard from './ItemCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

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
      <div className='relatedItemsStrip'>
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
      </div>
    );
  }
}

export default ItemsList;