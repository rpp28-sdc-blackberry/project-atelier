import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import ProductBreakdown from '../components/ProductBreakdown.jsx';

describe('ProductBreakdown component', () => {

  it('should exist', () => {
    expect(<ProductBreakdown />).toBeTruthy;
  });

});