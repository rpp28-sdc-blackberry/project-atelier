import React from 'react';

const DefaultView = (props) => {

  if (props.selectedStyle !== undefined) {
    var photoGallery = props.selectedStyle.photos;
    return (
      <div id="defaultView">
        <a target="_blank">
          <img 
            src={photoGallery[props.currPhotoIndex].url} 
            alt={props.selectedStyle.name} 
            className="defaultView" 
            id={props.selectedStyle.style_id}>
          </img>
        </a>
      </div>
    );
  } else {
    return (
      <div id="defaultView">DEFAULT VIEW</div>
    );
  }
};

export default DefaultView;