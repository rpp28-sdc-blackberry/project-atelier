import React from 'react';
import ShareToSocialMedia from './ShareToSocialMedia.jsx';
import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';
import StarRating from './StarRating.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToBag from './AddToBag.jsx';
import OverviewDescription from './OverviewDescription.jsx';
import OverviewFeatures from './OverviewFeatures.jsx';
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
            var indexStyleSelected = i;
            this.setState({
              styleInfo: data.results,
              selectedStyle: selectedStyle,
              indexStyleSelected: indexStyleSelected,
            });
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.state = {
      view: 'default',
      selectedStyle: undefined,
      info: undefined,
      styleInfo: undefined,
      indexStyleSelected: undefined,
    };
    this.handleStyleSelection = this.handleStyleSelection.bind(this);
  }
  
  toggleView() {
    //TODO
  }

  toggleStyleSelected() {
    //TODO
  }

  handleStyleSelection(e) {
    e.preventDefault();
    console.log(e.target.id);
    var index = Number(e.target.id);
    this.setState({
      indexStyleSelected: index,
      selectedStyle: this.state.styleInfo[index],
    });
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
    console.log('avail ', availableSizes);

    return (
      <div id="productDetails">
        <ThumbnailList selectedStyle={this.state.selectedStyle}/>
        {view()}
        <div id="info">
          <StarRating />
          <ProductInfo info={this.state.info} selectedStyle={this.state.selectedStyle}/>
          <StyleSelector changeStyle={this.handleStyleSelection} styleInfo={this.state.styleInfo} indexStyleSelected={this.state.indexStyleSelected} selectedStyle={this.state.selectedStyle}/>
          <AddToBag selectedStyle={this.state.selectedStyle} availableSizes={availableSizes}/>
        </div>
        <OverviewDescription info={this.state.info}/>
        <OverviewFeatures info={this.state.info}/>
        <ShareToSocialMedia />
      </div>
    );
  }
}

export default ProductDetails;