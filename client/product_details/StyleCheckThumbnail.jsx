import React from 'react';

var StyleCheckThumbnail = (props) => {
  if ((props.index + 1) % 4 === 0) {
    return (
      <a id={props.index} class="img-container"target="_blank" >
        <img src={props.style.photos[0].thumbnail_url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} alt={props.style.name} className="style" id={props.style.style_id}></img>
        <i id="checkIcon"class="fa fa-check-circle"></i>    
        <br></br>
      </a>
    );
  }
  return (
    <a id={props.index} class="img-container"target="_blank" >
      <img src={props.style.photos[0].thumbnail_url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} alt={props.style.name} className="style" id={props.style.style_id}></img>
      <i id="checkIcon"class="fa fa-check-circle"></i>    
    </a>
  );
};

export default StyleCheckThumbnail;