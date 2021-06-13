/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProductDetails from './ProductDetails.jsx';

var handleStyleSelection = (e) => {
  e.preventDefault();
  var index = Number(e.target.id);
  this.setState({
    indexStyleSelected: index,
    selectedStyle: this.state.styleInfo[index],
  });
};
const indexSelectedStyle = 0;
const info = {
  category: 'Jackets',
  default_price: '100',
  id: 2122,
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
};
const product_id = '22122';
const selectedStyle = {
  'default?': true,
  name: 'Forest Green & Black',
  original_price: '140',
  photos: [
    {
      thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      url: "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" 
    }
  ],
  skus: {
    714432: {
      quantity: 8,
      size: 'XS'
    }
  },
  style_id: 123142
};
const styleInfo = [
  selectedStyle
]

let container;

beforeEach(() => {
  //setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  //cleanup on exiting
  document.body.removeChild(container);
  container = null;
});

it('ProductDetails component renders', () => {
  act(() => {
    render(<ProductDetails 
      product_id={info.id}
      info={info}
      selectedStyle={selectedStyle}
      indexSelectedStyle={indexSelectedStyle}
      handleStyleSelection={handleStyleSelection}
    />, container);
  });
  expect(document.getElementById('productDetails')).toBeTruthy();
  expect(document.getElementById('thumbnailList')).toBeTruthy();
  expect(document.getElementById('defaultView')).toBeTruthy();
  expect(document.getElementById('info')).toBeTruthy();
  expect(document.getElementById('overviewDescription')).toBeTruthy();
  expect(document.getElementById('share')).toBeTruthy();
  expect(document.getElementById('overviewFeatures')).toBeTruthy();
  expect(document.getElementById('starRating')).toBeTruthy();
  expect(document.getElementById('productInfo')).toBeTruthy();
  expect(document.getElementById('styleSelector')).toBeTruthy();
  expect(document.getElementById('addToBag')).toBeTruthy();
});