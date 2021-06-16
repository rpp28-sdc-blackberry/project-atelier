import React from 'react';

const DefaultView = (props) => {

  if (props.selectedStyle) {
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
          <a onClick={props.toggleView} id="fullscreenIcon"><i class="fas fa-expand"></i></a>
        </a>
      </div>
    );
  } 
  return null;
};

export default DefaultView;