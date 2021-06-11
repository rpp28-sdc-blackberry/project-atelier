import React from 'react';
import StyleThumbnail from './StyleThumbnail.jsx';
import StyleCheckThumbnail from './StyleCheckThumbnail.jsx';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.styleInfo !== undefined) {
      return (
        <div id="styleSelector">
          <StyleCheckThumbnail style={this.props.selectedStyle}/>
          {this.props.styleInfo.map((style, index) => {
            if (index !== this.props.indexStyleSelected) {
              return (<StyleThumbnail style={style} index={index}/>);
            }
          })}
        </div>
      );
    }
    return (
      <div id="styleSelector"></div>
    );
  }
}

export default StyleSelector;