/**
 * @jest-environment jsdom
 */

import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import RelatedItems from '../RelatedItems.jsx';
import ItemsList from '../ItemsList.jsx';
import ItemCard from '../ItemCard.jsx';
import ComparisonModal from '../ComparisonModal.jsx';
import AddToOutfit from '../AddToOutfit.jsx';

describe('RelatedItems component should exist', () => {
  it('should exist', () => {
    expect(<RelatedItems />).toBeTruthy;
  });

  it('should render', () => {
    render(<RelatedItems />);
    const header = screen.getByText(/Related Items/);
    expect(header).toBeTruthy;
  });
});

describe('ItemsList component should exist', () => {
  it('should exist', () => {
    expect(<ItemsList />).toBeTruthy;
  });
});

describe('ItemCard component should exist', () => {
  it('should exist', () => {
    expect(<ItemCard />).toBeTruthy;
  });
});

describe('ComparisonModal component should exist', () => {
  it('should exist', () => {
    expect(<ComparisonModal />).toBeTruthy;
  });
});

describe('AddToOutfit component should exist', () => {
  it('should exist', () => {
    expect(<AddToOutfit />).toBeTruthy;
  });
});