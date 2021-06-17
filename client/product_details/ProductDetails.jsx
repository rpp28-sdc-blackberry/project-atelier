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

    this.state = {
      view: 'default',
      currPhotoIndex: 0,
    };
    
    this.handlePhotoSelection = this.handlePhotoSelection.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }
  
  toggleView() {
    //TODO
    console.log('toggleView');
    if (this.state.view === 'default') {
      this.setState({
        view: 'expanded'
      });
    } else {
      this.setState({
        view: 'default'
      });
    }
  }

  handlePhotoSelection(e) {
    e.preventDefault();
    var index = Number(e.target.id);
    this.setState({
      currPhotoIndex: index
    });
  }

  handleUpClick(e) {
    e.preventDefault();
    var totalPhotos = this.props.selectedStyle.photos.length;
    var newIndex = this.state.currPhotoIndex === 0 ? totalPhotos - 1 : this.state.currPhotoIndex - 1;
    this.setState({
      currPhotoIndex: newIndex
    });
  }

  handleDownClick(e) {
    e.preventDefault();
    var totalPhotos = this.props.selectedStyle.photos.length;
    var newIndex = this.state.currPhotoIndex === totalPhotos - 1 ? 0 : this.state.currPhotoIndex + 1;
    this.setState({
      currPhotoIndex: newIndex
    });
  }

  render() {

    var view = () => {
      if (this.state.view === 'default') {
        return (
          <DefaultView 
            selectedStyle={this.props.selectedStyle} 
            currPhotoIndex={this.state.currPhotoIndex}
            toggleView={this.toggleView}/>
        );
      } else if (this.state.view === 'expand') {
        return (
          <ExpandedView 
            selectedStyle={this.props.selectedStyle}
            currPhotoIndex={this.state.currPhotoIndex}
            toggleView={this.toggleView}/>
        );
      }
    };
    
    var availableSizes = [];
    if (this.props.selectedStyle) {
      var skus = this.props.selectedStyle.skus;
      for (var key in skus) {
        availableSizes.push([skus[key]['size'], skus[key]['quantity'], key]);
      }
    }

    return (
      <div id="productDetails">
        <ThumbnailList 
          selectedStyle={this.props.selectedStyle} 
          currPhotoIndex={this.state.currPhotoIndex}
          handlePhotoSelection={this.handlePhotoSelection}
          handleUpClick={this.handleUpClick}
          handleDownClick={this.handleDownClick}/>
        {this.state.view === 'default' ?
          <DefaultView 
            selectedStyle={this.props.selectedStyle} 
            currPhotoIndex={this.state.currPhotoIndex}
            toggleView={this.toggleView}/> :
          <ExpandedView 
            selectedStyle={this.props.selectedStyle}
            currPhotoIndex={this.state.currPhotoIndex}
            toggleView={this.toggleView}/>}
        {this.state.view === 'default' ? 
          <div id="info">
            <StarRating />
            <ProductInfo 
              info={this.props.info} 
              selectedStyle={this.props.selectedStyle}/>
            <StyleSelector 
              changeStyle={this.props.handleStyleSelection} 
              styleInfo={this.props.styleInfo} 
              indexStyleSelected={this.props.indexStyleSelected} 
              selectedStyle={this.props.selectedStyle}/>
            <AddToBag 
              selectedStyle={this.props.selectedStyle} 
              availableSizes={availableSizes}/>
          </div> : null}
        <OverviewDescription info={this.props.info}/>
        <OverviewFeatures info={this.props.info}/>
        <ShareToSocialMedia />
      </div>
    );
  }
}

export default ProductDetails;