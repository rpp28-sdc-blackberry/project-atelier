import React, {useState} from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {shallow} from 'enzyme';

import {reviews} from '../reviewsDummy.js';
import ReviewsList from '../components/ReviewsList.jsx';


describe('ReviewsList component', () => {
  let reviews = reviews.results;
  let option = 'relevance';

  test('should render ReviewsList component', () => {
    let reviewList = shallow(<ReviewsList reviews={reviews} sortingOption={option}/>);
    expect(reviewList.exists()).toBe(true);
  });
});