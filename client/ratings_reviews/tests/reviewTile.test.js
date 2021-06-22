/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import {reviews} from '../reviewsDummy.js';
import ReviewTile from '../components/ReviewTile.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('ReviewTile component', () => {
  it('should render when there are reviews', () => {
    act(() => {
      render(<ReviewTile
        review={reviews.results[0]}
      />, container);
    });
    expect(document.getElementsByClassName('review-tile')).toBeTruthy();
    expect(document.getElementsByClassName('review-tile-top-panel')).toBeTruthy();
    expect(document.getElementsByClassName('stars')).toBeTruthy();
    expect(document.getElementsByClassName('review-summary')).toBeTruthy();
    expect(document.getElementsByClassName('review-body')).toBeTruthy();
    expect(document.getElementsByClassName('review-additional-body')).toBeTruthy();
    expect(document.getElementsByClassName('review-additional-body-button')).toBeTruthy();
    expect(document.getElementsByClassName('review-photos')).toBeTruthy();
    expect(document.getElementsByClassName('user-recommend')).toBeTruthy();
    expect(document.getElementsByClassName('seller-response')).toBeTruthy();
    expect(document.getElementsByClassName('review-clickable')).toBeTruthy();
  });
});