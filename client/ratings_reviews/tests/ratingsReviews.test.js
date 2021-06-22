/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import RatingsReviews from '../RatingsReviews.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('RatingsReviews component', () => {
  it('should render', () => {
    act(() => {
      render(<RatingsReviews
        product_id='22122'
        info={{}}
      />, container);
    });
    expect(document.getElementsByClassName('review-overall-container')).toBeTruthy();
    expect(document.getElementsByClassName('review-content-container')).toBeTruthy();
    expect(document.getElementById('review-left-container')).toBeTruthy();
    expect(document.getElementById('review-right-container')).toBeTruthy();
  });
});