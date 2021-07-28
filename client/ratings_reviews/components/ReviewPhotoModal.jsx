import React from 'react';
import $ from 'jquery';

const PhotoModal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className='review-photo-modal' onClick={props.toggleModal}>
      <div className='review-photo-modal-content' onClick={e => e.stopPropagation()}>
        <img className='review-photo-modal-content' src={props.url}/>
      </div>
    </div>
  );
};

export default PhotoModal;