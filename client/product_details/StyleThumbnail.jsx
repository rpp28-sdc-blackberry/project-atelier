import React from 'react';

var StyleThumbnail = (props) => {
  console.log('i: ', props.i);
  if ((props.i + 1) % 4 === 0) {
    return (
      <a onClick={props.changeStyle} id={props.index} target="_blank">
        <img src={props.style.photos[0].thumbnail_url} alt={props.style.name} className="style" id={props.index}></img>
        <br></br>
      </a>
    );
  }
  return (
    <a onClick={props.changeStyle} id={props.index} target="_blank">
      <img src={props.style.photos[0].thumbnail_url} alt={props.style.name} className="style" id={props.index}></img>
    </a>
  );
};

export default StyleThumbnail;