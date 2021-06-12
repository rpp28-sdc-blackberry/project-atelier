import React from 'react';

const Modal = (props) => {
  return (
    <div className="qa-modal">
      <div className="qa-modal-content">
        <div className="qa-modal-header">
          <h4 className="qa-modal-title">Modal title</h4>
        </div>
        <div className="qa-modal-body">
          content goes here
        </div>
        <div className="qa-modal-footer">
          <button className="qa-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;