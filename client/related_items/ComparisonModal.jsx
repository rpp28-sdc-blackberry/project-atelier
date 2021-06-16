import React from 'react';

class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }

    let key = 0;

    return (
      <div id='comparisonModal' onClick={this.props.toggleModal}>
        <p>Comparing</p>
        <h4>{this.props.name}</h4>
        {this.props.features.map(feature =>
          <div key={`${key++}`}>{feature.feature}: {feature.value}</div>
        )}
      </div>
    );
  }
}

export default ComparisonModal;