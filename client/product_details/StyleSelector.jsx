import React from 'react';
import StyleThumbnail from './StyleThumbnail.jsx';

const StyleSelector = (props) => {
  if (props.styleInfo !== undefined) {
    var styleThumbnails = props.styleInfo.map((style, index) => <StyleThumbnail style={style} index={index} />);

    return (
      <div id="styleSelector">
        {styleThumbnails}
      </div>
    );
  }
  return (
    <div id="styleSelector"></div>
  );
};

export default StyleSelector;