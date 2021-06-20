import React from 'react';
import ItemsList from './ItemsList.jsx';
import OutfitList from './OutfitList.jsx';
import { getRelatedItems } from './helpers.js';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedItemsIds: [],
    };
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.initialize();
    }
  }

  initialize() {
    getRelatedItems(this.props.product_id)
      .then(relatedItems => {
        let uniqueItems = [...new Set(relatedItems)];
        this.setState({ relatedItemsIds: uniqueItems });
      });
  }

  render() {
    return (
      <div id='relatedItemsWrapper'>
        <h3>Related Items</h3>
        <ItemsList
          items={this.state.relatedItemsIds}
          productName={this.props.info.name}
          productFeatures={this.props.info.features}
          handleRelatedItemClick={this.props.handleRelatedItemClick} />

        <h3>Your Outfit</h3>
        <OutfitList
          info={this.props.info}
          defaultStyle={this.props.selectedStyle}
          handleRelatedItemClick={this.props.handleRelatedItemClick} />
      </div>
    );
  }
}

export default RelatedItems;