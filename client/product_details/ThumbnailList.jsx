import React from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailList = (props) => {

  if (props.selectedStyle) {

    return (
      <div id="thumbnailList">
        {props.styleInfo.length > 7 ? 
          <a onClick={props.handleUpClick} id="upScroll-container">
            <i id="upScroll" class="fa fa-angle-up"></i>
          </a> : null}    
        <br></br>
        {props.selectedStyle.photos.map((photo, index) =>
          <Thumbnail 
            name={props.selectedStyle.name} 
            photo={photo} 
            index={index} 
            indexSelected={props.currPhotoIndex}
            handlePhotoSelection={props.handlePhotoSelection}/>)}
        {props.styleInfo.length > 7 ?
          <a onClick={props.handleDownClick} id="downScroll-container">
            <i id="downScroll" class="fa fa-angle-down"></i>
          </a> : null}
      </div>
    );
  } 
  return (
    <div id="thumbnailList"></div>
  );
  
};

export default ThumbnailList;