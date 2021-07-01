import React from 'react';

var StyleThumbnail = (props) => {
  if ((props.index + 1) % 4 === 0) {
    return (
      <a onClick={props.changeStyle} id={props.index} target="_blank">
        <img src={props.style.photos[0].thumbnail_url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} alt={props.style.name} className="style" id={props.index}></img>
        <br></br>
      </a>
    );
  }
  return (
    <a onClick={props.changeStyle} id={props.index} target="_blank">
      <img src={props.style.photos[0].thumbnail_url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} alt={props.style.name} className="style" id={props.index}></img>
    </a>
  );
};

export default StyleThumbnail;