import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomView: false
    };
    
    this.toggleZoomView = this.toggleZoomView.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  
  componentDidMount() {
    var element = document.getElementById('expandedView');
    element.addEventListener("mousemove", this.handleMouseMove);
  }

  componentWillUnmount() {
    var element = document.getElementById('expandedView');
    element.removeEventListener("mousemove", this.handleMouseMove);
  }

  toggleZoomView() {
    this.setState({
      zoomView: !this.state.zoomView
    });
  }
  
  handleMouseMove(e) {
    var element = document.getElementById('expandedView');
    var xPercent = (e.offsetX / element.clientWidth) * 100;
    var yPercent = (e.offsetY / element.clientHeight) * 100;
    element.style.backgroundPositionX = xPercent + "%";
    element.style.backgroundPositionY = yPercent + "%";
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
            <a onClick={this.props.toggleView} id="fullscreenIcon">X</a>
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
          className={this.state.zoomView ? 'zoomInView' : 'zoomOutView'}
          style={{'backgroundImage': `url('${photoGallery[this.props.currPhotoIndex].url}')`}}
          onMouseMove={this.handleMouseMove}
          onClick={this.toggleZoomView}>
        </div>
      );
    }
    return null;
  }
}

export default ExpandedView;