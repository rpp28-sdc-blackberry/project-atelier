import React from 'react';
import ShareToSocialMedia from './ShareToSocialMedia.jsx';
import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';
import StarRating from './StarRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToBag from './AddToBag.jsx';
import ProductOverview from './ProductOverview.jsx';
import ThumbnailList from './ThumbnailList.jsx';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    
    fetch(`http://localhost:8080/products/${this.props.product_id}`)
      .then((response) => {
        return response.json();
      }) 
      .then((data) => {
        this.setState({
          info: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    
    fetch(`http://localhost:8080/products/${this.props.product_id}/styles`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i]['default?']) {
            var selectedStyle = data.results[i];
          }
        }
        this.setState({
          styleInfo: data.results,
          selectedStyle: selectedStyle,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.state = {
      view: 'default',
      selectedStyle: undefined,
      info: undefined,
      styleInfo: undefined,
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
          <DefaultView selectedStyle={this.state.selectedStyle} selectedStyle={this.state.selectedStyle}/>
        );
      } else {
        return (
          <ExpandedView selectedStyle={this.state.selectedStyle}/>
        );
      }
    };
    
    var availableSizes = [];
    if (this.state.selectedStyle) {
      var skus = this.state.selectedStyle.skus;
      for (var key in skus) {
        availableSizes.push([skus[key]['size'], skus[key]['quantity']]);
      }
    }

    return (
      <div id="productDetails">
        <ThumbnailList selectedStyle={this.state.selectedStyle}/>
        {view()}
        <div id="info">
          <StarRating />
          <ProductInfo info={this.state.info} selectedStyle={this.state.selectedStyle}/>
          <StyleSelector styleInfo={this.state.styleInfo}/>
          <AddToBag selectedStyle={this.state.selectedStyle} availableSizes={availableSizes}/>
        </div>
        <ProductOverview />
        <ShareToSocialMedia />
      </div>
    );
  }
}

export default ProductDetails;