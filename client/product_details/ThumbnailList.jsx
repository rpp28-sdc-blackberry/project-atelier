import React from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailList = (props) => {

  if (props.selectedStyle !== undefined) {

    return (
      <div id="thumbnailList">
        <a onClick={props.handleUpClick} id="upScroll-container">
          <i id="upScroll" class="fa fa-angle-up"></i>
        </a>
        <br></br>
        {props.selectedStyle.photos.map((photo, index) =>
          <Thumbnail 
            name={props.selectedStyle.name} 
            photo={photo} 
            index={index} 
            indexSelected={props.currPhotoIndex}
            handlePhotoSelection={props.handlePhotoSelection}/>)}
        <a onClick={props.handleDownClick} id="downScroll-container">
          <i id="downScroll" class="fa fa-angle-down"></i>
        </a>
      </div>
    );
  } 
  return (
    <div id="thumbnailList"></div>
  );
  
};

export default ThumbnailList;