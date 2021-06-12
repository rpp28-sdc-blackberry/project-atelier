import React from 'react';

const OverviewDescription = (props) => {
  if (props.info && props.info.slogan) {
    return (
      <div id="overviewDescription">
        <h2>{props.info.slogan}</h2>
        <div>{props.info.description}</div>
      </div>
    );
  } else {
    return (
      <div id="overviewDescription"></div>
    );
  }
};

export default OverviewDescription;