import React from 'react';
import Thumbnail from './Thumbnail.jsx';

class ThumbnailList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstPhotoIndex: 0
    };

    this.handleUpScroll = this.handleUpScroll.bind(this);
    this.handleDownScroll = this.handleDownScroll.bind(this);
  }

  handleUpScroll() {
    var newIndex = this.state.firstPhotoIndex === 0 ?
      (this.props.selectedStyle.photos.length - 1) : this.state.firstPhotoIndex - 1;
    this.setState({
      firstPhotoIndex: newIndex
    });
  }

  handleDownScroll() {
    var newIndex = this.state.firstPhotoIndex === (this.props.selectedStyle.photos.length - 1) ?
      0 : this.state.firstPhotoIndex + 1;
    this.setState({
      firstPhotoIndex: newIndex
    });
  }
  
  render() {
    if (this.props.selectedStyle) {
      var photos = this.props.selectedStyle.photos.slice(this.state.firstPhotoIndex);
      if (photos.length < 7) {
        var remainder = this.props.selectedStyle.photos.slice(0, (7 - photos.length));
        photos.concat(remainder);
      }

      return (
        <div id="thumbnailList">
          {this.props.selectedStyle.photos.length > 7 ? 
            <a onClick={this.handleUpScroll} id="upScroll-container">
              <i id="upScroll" class="fa fa-angle-up"></i>
            </a> : null}    
          <br></br>
          {photos.map((photo, index) => {
            var initIndex = index;
            var finalIndex;
            if ((initIndex + this.state.firstPhotoIndex) > (this.props.selectedStyle.photos.length - 1)) {
              finalIndex = initIndex + this.state.firstPhotoIndex - this.props.selectedStyle.photos.length - 1;
            } else {
              finalIndex = initIndex;
            }
            return (
              <Thumbnail 
                name={this.props.selectedStyle.name} 
                photo={photo} 
                index={finalIndex} 
                indexSelected={this.props.currPhotoIndex}
                handlePhotoSelection={this.props.handlePhotoSelection}/>
            );
          })}
          {this.props.selectedStyle.photos.length > 7 ?
            <a onClick={this.handleDownScroll} id="downScroll-container">
              <i id="downScroll" class="fa fa-angle-down"></i>
            </a> : null}
        </div>
      );
    } 
    return null;
  }
  
}

export default ThumbnailList;