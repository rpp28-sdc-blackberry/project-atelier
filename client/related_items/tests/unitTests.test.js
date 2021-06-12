/**
 * @jest-environment jsdom
 */

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import RelatedItems from '../RelatedItems.jsx';

describe('RelatedItems component should exist', () => {
  it('should exist', () => {
    expect(<RelatedItems />).toBeTruthy;
  });
});