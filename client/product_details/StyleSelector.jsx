import React from 'react';
import StyleThumbnail from './StyleThumbnail.jsx';
import StyleCheckThumbnail from './StyleCheckThumbnail.jsx';

const StyleSelector = (props) => {

  if (props.styleInfo) {

    var i = 0;

    return (
      <div id="styleSelector">
        {props.styleInfo.map((style, index) => {
          if (index !== props.indexStyleSelected) {
            return (<StyleThumbnail key={index} changeStyle={props.changeStyle} style={style} index={index}/>);
          } else {
            return (<StyleCheckThumbnail key={index} changeStyle={props.changeStyle} style={props.selectedStyle} index={index}/>);
          }
        })}
      </div>
    );
  }
  return (
    <div id="styleSelector"></div>
  );
};

export default StyleSelector;