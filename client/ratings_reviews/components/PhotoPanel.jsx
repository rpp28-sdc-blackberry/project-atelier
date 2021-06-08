import React from 'react';

const PhotoPanel = (props) => (
  <img class='review-photo' src={props.photo.url}/>
);

export default PhotoPanel;