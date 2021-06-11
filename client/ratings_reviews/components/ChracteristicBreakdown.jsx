import React from 'react';

const CharacteristicBreakdown = (props) => (
  <div>
    <label>{props.characteristic.name}</label><br></br>
    <meter min='0' max='5' low='1' high='4' optimum='2.5' value={props.characteristic.value}></meter>
  </div>
);

export default CharacteristicBreakdown;