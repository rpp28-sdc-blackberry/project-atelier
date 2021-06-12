import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProductDetails from '/Users/alizehrehman/Documents/RPP28/project-atelier/client/product_details/ProductDetails.jsx';

let container = null;
beforeEach(() => {
  //setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  //cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with product_id as props', () => {
  act(() => {
    render(<ProductDetails product_id='22124'/>, container);
  });
  expect(container.id).toBe('productDetails');
});