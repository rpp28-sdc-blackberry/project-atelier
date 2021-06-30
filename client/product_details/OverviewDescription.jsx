import React from 'react';

const OverviewDescription = (props) => {
  if (props.info) {
    return (
      <div id="overviewDescription">
        {props.info.slogan ? <h2>{props.info.slogan}</h2> : null}
        {props.info.description ? <div>{props.info.description}</div> : null}
      </div>
    );
  } else {
    return (
      <div id="overviewDescription"></div>
    );
  }
};

export default OverviewDescription;