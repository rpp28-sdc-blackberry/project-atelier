import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomView: false
    };
    
    this.toggleZoomView = this.toggleZoomView.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  toggleZoomView() {
    this.setState({
      zoomView: !this.state.zoomView
    });
  }
  
  handleMouseMove(e) {
    console.log('in mouse move');
    var mover = document.querySelector("#expandedMover");
    mover.style.backgroundPositionX = -e.offsetX * 1.8 + "px";
    mover.style.backgroundPositionY = -e.offsetY * 80 + "px";
  }

  handleMouseEnter(e) {
    console.log('in mouse enter');
    var mover = document.querySelector("#expandedMover");
    var container = document.querySelector("#expandedContainer");
    setTimeout(() => {
      mover.classList.add("no-more-slidey");
      container.removeEventListener("mouseenter");
    }, 250);
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
          className="zoomInView">
          <a className="expandedContainer" 
            id="expandedContainer" 
            target="_blank" 
            rel="noopener"
            onMouseMove={this.handleMouseMove}
            onMouseEnter={this.handleMouseEnter}>
            <div className="expandedMover" 
              id="expandedMover"
              style={{'backgroundImage': `url('${photoGallery[this.props.currPhotoIndex].url}')`}}>
            </div>
          </a>
        </div>
      );
    }
    return null;
  }
}

export default ExpandedView;