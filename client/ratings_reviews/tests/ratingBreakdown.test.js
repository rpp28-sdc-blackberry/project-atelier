/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import {meta} from '../reviewsDummy.js';
import RatingBreakdown from '../components/RatingBreakdown.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('RatingBreakdown component', () => {
  it('should render when there are ratings', () => {
    act(() => {
      render(<RatingBreakdown
        product_id='22122'
        meta={meta}
        handleStarFilters={() => {}}
        starFilters={[]}
        removeFilters={() => {}}
      />, container);
    });
    expect(document.getElementsByClassName('review-rating-breakdown')).toBeTruthy();
    expect(document.getElementsByClassName('review-average-rating')).toBeTruthy();
    expect(document.getElementsByClassName('review-average-rating-number')).toBeTruthy();
    expect(document.getElementsByClassName('stars')).toBeTruthy();
    expect(document.getElementsByClassName('review-recommended-percentage')).toBeTruthy();
    expect(document.getElementsByClassName('review-filter-panel')).toBeTruthy();
    expect(document.getElementsByClassName('review-clickable')).toBeTruthy();
    expect(document.getElementsByClassName('review-rating-bar')).toBeTruthy();
  });
});