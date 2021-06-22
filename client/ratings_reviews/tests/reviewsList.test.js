/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import {reviews} from '../reviewsDummy.js';
import ReviewsList from '../components/ReviewsList.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('ReviewsList component', () => {
  it('should render when there are reviews', () => {
    act(() => {
      render(<ReviewsList
        reviews={reviews.results}
        sortingOption='relevance'
      />, container);
    });
    expect(document.getElementsByClassName('reviews-list')).toBeTruthy();
    expect(document.getElementsByClassName('reviews-list-tiles')).toBeTruthy();
    expect(document.getElementsByClassName('review-button')).toBeTruthy();
  });

  it('should render when there is no review', () => {
    act(() => {
      render(<ReviewsList
        reviews={[]}
        sortingOption='relevance'
      />, container);
    });
    expect(document.getElementsByClassName('review-empty-reviews-list')).toBeTruthy();
  });
});








