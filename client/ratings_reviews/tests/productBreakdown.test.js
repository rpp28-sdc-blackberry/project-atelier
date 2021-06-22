/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import {meta} from '../reviewsDummy.js';
import ProductBreakdown from '../components/ProductBreakdown.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('ProductBreakdown component', () => {
  it('should render when there are characteristics', () => {
    act(() => {
      render(<ProductBreakdown
        meta={meta}
      />, container);
    });
    expect(document.getElementsByClassName('review-product-breakdown')).toBeTruthy();
  });
});