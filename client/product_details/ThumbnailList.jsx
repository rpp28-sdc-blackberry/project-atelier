import React from 'react';

const ThumbnailList = (props) => {

  console.log('thumbnail: ', props.selectedStyle);
  if (props.selectedStyle !== undefined) {
    var thumbnails = props.selectedStyle.photos.map((photo, index) => {
      return (
        <a target="_blank" href={photo.thumbnail_url}>
          <img src={photo.thumbnail_url} alt={props.selectedStyle.name} className="stylePhoto" id={index}></img>
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
};

export default ThumbnailList;