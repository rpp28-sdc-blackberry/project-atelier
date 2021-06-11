import React from 'react';

var StyleCheckThumbnail = (props) => {
  return (
    <a class="img-container"target="_blank" href={props.style.photos[0].thumbnail_url}>
      <img src={props.style.photos[0].thumbnail_url} alt={props.style.name} className="style" id={props.style.style_id}></img>
      <i id="checkIcon"class="fa fa-check-circle"></i>    
    </a>
  );
};

export default StyleCheckThumbnail;