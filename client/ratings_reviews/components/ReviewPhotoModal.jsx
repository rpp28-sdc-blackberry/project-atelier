import React from 'react';
import $ from 'jquery';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class='review-photo-modal' onClick={this.props.closeModal}>
        <div class='review-photo-modal-content' onClick={e => e.stopPropagation()}>
          <img class='review-photo-modal-content' src={this.props.url}/>
        </div>
      </div>
    );
  }
}

export default Modal;