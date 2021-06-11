import React from 'react';

const CharacteristicBreakdown = (props) => (
  <div>
    {props.characteristic.name}
    {props.characteristic.value}
  </div>
);

export default CharacteristicBreakdown;