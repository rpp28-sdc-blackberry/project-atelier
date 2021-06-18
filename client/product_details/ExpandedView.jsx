import React from 'react';

const ExpandedView = (props) => {

  if (props.selectedStyle) {
    var photoGallery = props.selectedStyle.photos;
    return (
      <div id="expandedView">
        <a target="_blank">
          <img 
            src={photoGallery[props.currPhotoIndex].url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} 
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

export default ExpandedView;