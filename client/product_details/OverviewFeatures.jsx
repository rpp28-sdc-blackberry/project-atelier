import React from 'react';

const OverviewFeatures = (props) => {
  if (props.info && props.info.features) {
    return (
      <div id="overviewFeatures">
        {props.info.features.map((feature) => {
          return (
            <div id={feature.feature} className="feature">&#10003; {feature.feature}: {feature.value}</div>
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