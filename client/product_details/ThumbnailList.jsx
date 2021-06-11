import React from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailList = (props) => {

  if (props.selectedStyle !== undefined) {

    return (
      <div id="thumbnailList">
        <i class="fas fa-angle-up"></i>
        <br></br>
        {props.selectedStyle.photos.map((photo, index) =>
          <Thumbnail name={props.selectedStyle.name} photo={photo} index={index} indexSelected={props.currPhotoIndex}/>)}
        <i class="fas fa-angle-down"></i>
      </div>
    );
  } 
  return (
    <div id="thumbnailList"></div>
  );
  
};

export default ThumbnailList;