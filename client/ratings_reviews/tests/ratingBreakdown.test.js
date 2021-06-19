import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import RatingBreakdown from '../components/RatingBreakdown.jsx';

describe('RatingBreakdown component', () => {

  it('should exist', () => {
    expect(<RatingBreakdown />).toBeTruthy;
  });

});