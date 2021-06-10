import React from 'react';

const OverviewFeatures = (props) => {
  if (props.info !== undefined && props.info.features !== undefined) {
    return (
      <div id="overviewFeatures">
        {props.info.features.map((feature) => {
          return (
            <div>&#10003; {feature.feature}: {feature.value}</div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div id="overviewFeatures"></div>
    );
  }
};

export default OverviewFeatures;