import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import ReviewTile from '../components/ReviewTile.jsx';

describe('ReviewTile component', () => {

  it('should exist', () => {
    expect(<ReviewTile />).toBeTruthy;
  });

});