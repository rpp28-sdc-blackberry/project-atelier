import React from 'react';

class ThumbnailList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedThumbnail: this.props.selectedStyle
    };
  }

  render() {
    console.log('thumbnail: ', this.props.selectedStyle);
    if (this.props.selectedStyle !== undefined) {
      var thumbnails = this.props.selectedStyle.photos.map((photo, index) => {
        return (
          <a target="_blank" href={photo.thumbnail_url}>
            <img src={photo.thumbnail_url} alt={this.props.selectedStyle.name} className="stylePhoto" id={index}></img>
            <br></br>
          </a>
        );
      });

      return (
        <div id="thumbnailList">
          {thumbnails}
        </div>
      );
    } else {
      return (
        <div id="thumbnailList"></div>
      );
    }
  }
}

export default ThumbnailList;