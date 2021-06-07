import { forEach } from 'lodash';
import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylesList: ['A', 'B', 'C']
    };
  }

  render() {
    return (
      <div id="styleSelector">
        {forEach(this.state.stylesList, (style) => {
          return (<div>{style}</div>);
        })}
      </div>
    );
  }
}

export default StyleSelector;