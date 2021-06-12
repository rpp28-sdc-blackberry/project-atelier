import React from 'react';

const Thumbnail = (props) => {
  if (props.index === props.indexSelected) {
    return (
      <a target="_blank">
        <img 
          src={props.photo.thumbnail_url} 
          alt={props.name} 
          className="stylePhoto selectedThumbnail" 
          id={props.index}/>
        <br></br>
      </a>
    );
  }
  return (
    <a target="_blank">
      <img 
        src={props.photo.thumbnail_url} 
        alt={props.name} 
        className="stylePhoto" 
        id={props.index}
        onClick={props.handlePhotoSelection}></img>
      <br></br>
    </a>
  );
  
};

export default Thumbnail;