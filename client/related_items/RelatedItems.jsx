import React from 'react';
import ItemsList from './ItemsList.jsx';
import helpers from './helpers.js';

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
    if (this.props.selectedStyle && this.props.info) {
      return (
        <div id='relatedItemsWrapper'>
          <h3>Related Items</h3>
          <ItemsList listType='relatedItems' items={this.state.relatedItemsIds} />
          <h3>Your Outfit</h3>
          <ItemsList listType='yourOutfit' info={this.props.info} defaultStyle={this.props.selectedStyle} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default RelatedItems;