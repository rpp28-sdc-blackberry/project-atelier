import { forEach } from 'lodash';
import React from 'react';

const StyleSelector = (props) => {
  if (props.styleInfo !== undefined) {
    console.log(props);
    var styleThumbnails = props.styleInfo.map((style) =>
      <a target="_blank" href={style.photos[0].thumbnail_url}>
        <img src={style.photos[0].thumbnail_url} alt={style.name} className="style" id={style.style_id}></img>
      </a>
    );

    return (
      <div id="styleSelector">
        {styleThumbnails}
      </div>
    );
  } else {
    return (
      <div id="styleSelector"></div>
    );
  }
};

export default StyleSelector;