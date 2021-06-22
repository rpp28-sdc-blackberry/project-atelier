/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import {meta} from '../reviewsDummy.js';
import ReviewForm from '../components/ReviewForm.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('ReviewForm component', () => {
  it('should render', () => {
    act(() => {
      render(<ReviewForm
        productName='Testing Product'
        meta={meta}
      />, container);
    });
    expect(document.getElementsByClassName('review-button')).toBeTruthy();
  });
});