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
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }
  
  toggleView() {
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
    var index = e.target.id;
    index = Number(index);
    this.setState({
      currPhotoIndex: index
    });
  }

  handleLeftClick(e) {
    e.preventDefault();
    var totalPhotos = this.props.selectedStyle.photos.length;
    var newIndex = this.state.currPhotoIndex === 0 ? totalPhotos - 1 : this.state.currPhotoIndex - 1;
    this.setState({
      currPhotoIndex: newIndex
    });
  }

  handleRightClick(e) {
    e.preventDefault();
    var totalPhotos = this.props.selectedStyle.photos.length;
    var newIndex = this.state.currPhotoIndex === totalPhotos - 1 ? 0 : this.state.currPhotoIndex + 1;
    this.setState({
      currPhotoIndex: newIndex
    });
  }

  render() {
    
    var availableSizes = [];
    if (this.props.selectedStyle) {
      var skus = this.props.selectedStyle.skus;
      for (var key in skus) {
        if (key !== null && key !== 'null') {
          availableSizes.push([skus[key]['size'], skus[key]['quantity'], key]);
        }
      }
    }

    return (
      <div id="productDetails">
        {this.state.view === 'default' ?
          <div id='firstPanelDefault'>
            <ThumbnailList 
              selectedStyle={this.props.selectedStyle}
              styleInfo={this.props.styleInfo} 
              currPhotoIndex={this.state.currPhotoIndex}
              handlePhotoSelection={this.handlePhotoSelection}
              view={this.state.view}/>
            <DefaultView 
              selectedStyle={this.props.selectedStyle}
              styleInfo={this.props.styleInfo} 
              currPhotoIndex={this.state.currPhotoIndex}
              toggleView={this.toggleView}
              handleLeftClick={this.handleLeftClick}
              handleRightClick={this.handleRightClick}/>
            <div id="info">
              <StarRating 
                averageRating={this.props.averageRating}
                reviewsNumber={this.props.reviewsNumber}/>
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
            </div> 
          </div> :
          <div id="firstPanelExpanded">
            <ThumbnailList 
              selectedStyle={this.props.selectedStyle}
              styleInfo={this.props.styleInfo} 
              currPhotoIndex={this.state.currPhotoIndex}
              handlePhotoSelection={this.handlePhotoSelection}
              view={this.state.view}/>
            <ExpandedView 
              selectedStyle={this.props.selectedStyle}
              styleInfo={this.props.styleInfo}
              currPhotoIndex={this.state.currPhotoIndex}
              toggleView={this.toggleView}
              handleLeftClick={this.handleLeftClick}
              handleRightClick={this.handleRightClick}/>
          </div>}
        <div id="secondPanel">
          <OverviewDescription info={this.props.info}/>
          <OverviewFeatures info={this.props.info}/>
          <ShareToSocialMedia currPhotoIndex={this.state.currPhotoIndex} selectedStyle={this.props.selectedStyle}/>
        </div>
      </div>
    );
  }
}

export default ProductDetails;