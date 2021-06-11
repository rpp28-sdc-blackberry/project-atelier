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
    <a target="_blank" href={props.style.photos[0].thumbnail_url}>
      <img src={props.style.photos[0].thumbnail_url} alt={props.style.name} className="style" id={props.style.style_id}></img>
    </a>
  );
};

export default StyleThumbnail;