import React from 'react';

const Thumbnail = (props) => {
  if (props.index === props.indexSelected) {
    return (
      <a target="_blank">
        <img 
          src={props.photo.thumbnail_url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} 
          alt={props.name} 
          className={'stylePhoto' + props.view + ' selectedThumbnail'}
          id={props.index}/>
        <br></br>
      </a>
    );
  }
  return (
    <a target="_blank">
      <img 
        src={props.photo.thumbnail_url || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} 
        alt={props.name} 
        className={'stylePhoto' + props.view } 
        id={props.index}
        onClick={props.handlePhotoSelection}></img>
      <br></br>
    </a>
  );
  
};

export default Thumbnail;