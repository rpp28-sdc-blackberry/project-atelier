import React from 'react';
import ShareToSocialMedia from './ShareToSocialMedia.jsx';
import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';
import StarRating from './StarRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToBag from './AddToBag.jsx';
import ProductOverview from './ProductOverview.jsx';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      styleSelected: ''
    };
  }
  
  toggleView() {
    //TODO
  }

  toggleStyleSelected() {
    //TODO
  }

  render() {
    var view = () => {
      if (this.state.view === 'default') {
        return (
          <DefaultView />
        );
      } else {
        return (
          <ExpandedView />
        );
      }
    };

    return (
      <div id="productDetails">
        {view()}
        <StarRating />
        <ProductInfo />
        <StyleSelector />
        <AddToBag />
        <ProductOverview />
        <ShareToSocialMedia />
      </div>
    );
  }
}

export default ProductDetails;