import React from 'react';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currPhotoIndex: 0,
    };
  }

  render() {
    if (this.props.selectedStyle !== undefined) {
      var photoGallery = this.props.selectedStyle.photos;
      return (
        <div id="defaultView">
          <a target="_blank" href={photoGallery[this.state.currPhotoIndex].url}>
            <img src={photoGallery[this.state.currPhotoIndex].url} alt={this.props.selectedStyle.name} className="defaultView" id={this.props.selectedStyle.style_id}></img>
          </a>
        </div>
      );
    } else {
      return (
        <div id="defaultView">DEFAULT VIEW</div>
      );
    }
  }
}

export default DefaultView;