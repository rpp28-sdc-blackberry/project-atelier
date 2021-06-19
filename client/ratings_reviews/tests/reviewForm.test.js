import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';

import dummy from '../reviewsDummy.js';
import ReviewForm from '../components/ReviewForm.jsx';

describe('ReviewForm component', () => {

  let productName = 'Product Name Sample';

  test('should render ReviewForm component', () => {
    let reviewForm = shallow(<ReviewForm productName={productName} meta={{}}/>);
    expect(reviewForm.exists()).toBe(true);
  });

});