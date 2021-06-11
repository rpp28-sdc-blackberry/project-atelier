import React from 'react';
import AddToOutfit from './AddToOutfit.jsx';
import ItemCard from './ItemCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';

class ItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      this.props.listType === 'relatedItems'
        ? <div className='relatedItemsStrip'>
          <ComparisonModal showModal={this.state.showModal} toggleModal={this.toggleModal}/>
          {this.props.items.map(itemId => <ItemCard id={itemId} key={itemId} toggleModal={this.toggleModal} />)}
        </div>
        : <div className='relatedItemsStrip'>
          <AddToOutfit />
        </div>
    );
  }
}

export default ItemsList;