import React from 'react';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPhoto: '',
      photoGallery: []
    };
  }

  render() {
    return (
      <div>carousel will go here</div>
    );
  }
}

export default DefaultView;