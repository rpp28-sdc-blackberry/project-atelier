import React from 'react';

class ReviewFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="review-form-modal" onClick={this.props.closeModal}>
        <div className="review-form-modal-content" onClick={e => e.stopPropagation()}>
          FORM GOES HERE!
        </div>
      </div>
    );
  }
}

export default ReviewFormModal;