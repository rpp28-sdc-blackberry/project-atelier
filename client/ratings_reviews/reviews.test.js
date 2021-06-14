import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import RatingsReviews from './RatingsReviews.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingOptions from './components/SortingOptions.jsx';

describe('RatingsReviews component', () => {

  it('should exist', () => {
    expect(<RatingsReviews />).toBeTruthy;
  });

});

describe('ReviewsList component', () => {

  it('should exist', () => {
    expect(<RatingsReviews />).toBeTruthy;
  });

});

describe('ReviewTile component', () => {

  it('should exist', () => {
    expect(<ReviewTile />).toBeTruthy;
  });

});

describe('RatingBreakdown component', () => {

  it('should exist', () => {
    expect(<RatingBreakdown />).toBeTruthy;
  });

});

describe('ProductBreakdown component', () => {

  it('should exist', () => {
    expect(<ProductBreakdown />).toBeTruthy;
  });

});

describe('SortingOptions component', () => {

  it('should exist', () => {
    expect(<SortingOptions />).toBeTruthy;
  });

});