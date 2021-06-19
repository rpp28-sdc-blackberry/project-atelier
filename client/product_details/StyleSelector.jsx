import React from 'react';
import StyleThumbnail from './StyleThumbnail.jsx';
import StyleCheckThumbnail from './StyleCheckThumbnail.jsx';

const StyleSelector = (props) => {
  
  if (props.styleInfo) {

    var i = 0;

    return (
      <div id="styleSelector">
        <StyleCheckThumbnail changeStyle={props.changeStyle} style={props.selectedStyle} index={props.indexStyleSelected}/>
        {props.styleInfo.map((style, index) => {
          if (index !== props.indexStyleSelected) {
            i = i + 1;
            return (<StyleThumbnail changeStyle={props.changeStyle} style={style} index={index} i={i}/>);
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