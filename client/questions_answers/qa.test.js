/**
 * @jest-environment jsdom
 */

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import QuestionsAnswers from './QuestionsAnswers.jsx';

describe('<QuestionsAnswers />', () => {
  it('should exist', () => {
    expect(<QuestionsAnswers />).toBeTruthy;
  });

});
