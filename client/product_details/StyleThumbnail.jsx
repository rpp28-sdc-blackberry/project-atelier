import React from 'react';

var StyleThumbnail = (props) => {
  if ((props.index + 1) % 4 === 0) {
    return (
      <a target="_blank" href={props.style.photos[0].thumbnail_url}>
        <img src={props.style.photos[0].thumbnail_url} alt={props.style.name} className="style" id={props.style.style_id}></img>
        <br></br>
      </a>
    );
  }
  return (
    <div>
      <a class="img-container"target="_blank" href={props.style.photos[0].thumbnail_url}>
        <img src={props.style.photos[0].thumbnail_url} alt={props.style.name} className="style" id={props.style.style_id}></img>
        <i id="checkIcon"class="fa fa-check-circle"></i>    
      </a>
    </div>
  );
};

export default StyleThumbnail;