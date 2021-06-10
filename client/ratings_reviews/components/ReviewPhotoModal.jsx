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
      <div class='review-photo-modal' style={{'margin-top': 500}}>
        <button class='review-close-modal' onClick={this.props.closeModal}>Close</button>
        <img class='review-photo-modal-content' src={this.props.url}/>
      </div>
    );
  }
}

export default Modal;