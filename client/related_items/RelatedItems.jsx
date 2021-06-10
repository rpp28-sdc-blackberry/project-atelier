import React from 'react';
import ItemsList from './ItemsList.jsx';
import helpers from './helpers.js';

//Then request Info + Styles for each of the product IDs
//Manipulate data in server to only return what is needed here
//Pass data from here down to the related products item list

//Need to do something else for the Outfits list (local storage, cookies?)
class RelatedItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedItemsIds: []
    };
  }

  componentDidMount() {
    helpers.getRelatedItems(this.props.product_id)
      .then(relatedItems => this.setState({ relatedItemsIds: relatedItems }));
  }

  render() {
    return (
      <div>
        <h3>Related Items</h3>
        <ItemsList listType={'relatedItems'} items={this.state.relatedItemsIds} />
        <h3>Your Outfit</h3>
        <ItemsList listType={'yourOutfit'} />
      </div>
    );
  }
}

export default RelatedItems;