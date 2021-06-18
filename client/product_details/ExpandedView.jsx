import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomView: false
    };
    
    this.toggleZoomView = this.toggleZoomView.bind(this);
  }

  toggleZoomView() {
    this.setState({
      zoomView: !this.state.zoomView
    });
  }

  render() {
    if (this.props.selectedStyle && !this.state.zoomView) {
      var photoGallery = this.props.selectedStyle.photos;
      return (
        <div id="expandedView">
          <a target="_blank">
            <img
              onClick={this.toggleZoomView}
              src={photoGallery[this.props.currPhotoIndex].url} 
              alt={this.props.selectedStyle.name} 
              className={this.state.zoomView ? 'zoomInView' : 'zoomOutView'} 
              id={this.props.selectedStyle.style_id}>
            </img>
            <a onClick={this.props.toggleView} id="fullscreenIcon"><i class="fas fa-expand"></i></a>
            {this.props.currPhotoIndex !== 0 ? 
              <a
                onClick={this.props.handleLeftClick} 
                id="leftArrow">&larr;
              </a> : null}
            {this.props.currPhotoIndex !== (this.props.styleInfo.length - 1) ?
              <a 
                onClick={this.props.handleRightClick}
                id="rightArrow">&rarr;
              </a> : null}
          </a>
        </div>
      );
    } else if (this.state.zoomView) {
      var photoGallery = this.props.selectedStyle.photos;
      return (
        <div 
          id="expandedView"
          className="zoomInView"
          styles={`background-image: url(${photoGallery[this.props.currPhotoIndex].url})`}>
          <a onClick={this.props.toggleView} id="fullscreenIcon"><i class="fas fa-expand"></i></a>
          {this.props.currPhotoIndex !== 0 ? 
            <a
              onClick={this.props.handleLeftClick} 
              id="leftArrow">&larr;
            </a> : null}
          {this.props.currPhotoIndex !== (this.props.styleInfo.length - 1) ?
            <a 
              onClick={this.props.handleRightClick}
              id="rightArrow">&rarr;
            </a> : null}
        </div>
      );
    }
    return null;
  }
}

export default ExpandedView;