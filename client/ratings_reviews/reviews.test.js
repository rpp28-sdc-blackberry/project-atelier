import React, {useState} from 'react';
import TestRenderer from 'react-testing-renderer';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import RatingsReviews from './RatingsReviews.jsx';

describe('RatingsReviews component', () => {

  it('should exist', () => {
    expect(<RatingsReviews />).toBeTruthy;
  });

  it('should...', () => {
    const testRenderer = TestRenderer.create(<RatingsReviews />);
    const testInstance = testRenderer.root;

  });

});