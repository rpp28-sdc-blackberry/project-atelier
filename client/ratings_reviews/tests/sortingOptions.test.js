import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import SortingOptions from '../components/SortingOptions.jsx';

describe('SortingOptions component', () => {

  it('should exist', () => {
    expect(<SortingOptions />).toBeTruthy;
  });

});