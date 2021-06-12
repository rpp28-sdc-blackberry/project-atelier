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
      featuresToCompare: []
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