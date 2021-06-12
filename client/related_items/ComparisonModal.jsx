import React from 'react';

class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }

    return (
      <div id='comparisonModal' onClick={this.props.toggleModal}>
        <h4>{this.props.name}</h4>
        {this.props.features.map(feature =>
          <p>{feature.feature}: {feature.value}</p>
        )}
      </div>
    );
  }
}

export default ComparisonModal;