import React from 'react';
import $ from 'jquery';

const PhotoModal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div class='review-photo-modal' onClick={props.toggleModal}>
      <div class='review-photo-modal-content' onClick={e => e.stopPropagation()}>
        <img class='review-photo-modal-content' src={props.url}/>
      </div>
    </div>
  );
};

export default PhotoModal;