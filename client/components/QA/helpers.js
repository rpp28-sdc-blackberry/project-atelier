import React from 'react';

const formatAnswererName = (name) => {
  return name === 'Seller' ? <b>{name}</b> : name;
};

const formatDate = (rawDate) => {

  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  let dateToFormat = rawDate.slice(0, 10).split('-');
  let month = months[dateToFormat[1]];
  let day = dateToFormat[2][0] === '0' ? dateToFormat[2][1] : dateToFormat[2];
  let year = dateToFormat[0];

  return `${month} ${day}, ${year}`;

};

export { formatAnswererName, formatDate };