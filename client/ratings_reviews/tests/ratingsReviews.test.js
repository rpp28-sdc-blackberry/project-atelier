import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import RatingsReviews from '../RatingsReviews.jsx';

describe('RatingsReviews component', () => {

  it('should exist', () => {
    expect(<RatingsReviews />).toBeTruthy;
  });

});