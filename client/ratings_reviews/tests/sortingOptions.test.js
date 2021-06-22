/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';
import { act } from 'react-dom/test-utils';

import {reviews} from '../reviewsDummy.js';
import SortingOptions from '../components/SortingOptions.jsx';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('SortingOptions component', () => {
  it('should render', () => {
    act(() => {
      render(<SortingOptions
        handleOptionChanges={() => {}}
        reviews={reviews.results}
      />, container);
    });
    expect(document.getElementById('sorting-options')).toBeTruthy();
  });
});