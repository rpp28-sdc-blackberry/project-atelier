/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import data from './dummyData.js';
import ProductDetails from '../ProductDetails.jsx';
import OverviewFeatures from '../OverviewFeatures.jsx';

var handleStyleSelection = (e) => {
  e.preventDefault();
  var index = Number(e.target.id);
  this.setState({
    indexStyleSelected: index,
    selectedStyle: this.state.styleInfo[index],
  });
};

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

it('ProductDetails components renders with all information', () => {
  act(() => {
    render(<ProductDetails 
      product_id={data.one.id}
      info={data.one}
      selectedStyle={data.oneStyles.results[0]}
      indexSelectedStyle={0}
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
it('OverviewFeatures component does not render a feature whose value is null', () => {
  act(() => {
    render(<OverviewFeatures info={data.two}/>, container);
  });
  expect(document.getElementById('UV Protection')).toBeNull();
});
it('AddToBag component says OUT OF STOCK if no sizes are available', () => {
  act(() => {
    render(<ProductDetails 
      product_id={data.two.id}
      info={data.two}
      selectedStyle={data.twoStyles.results[0]}
      indexSelectedStyle={0}
      handleStyleSelection={handleStyleSelection}
    />, container);
  });
  expect(document.getElementById('selectSize').firstChild.value).toEqual('OUT OF STOCK');
});
it('StyleSelector and DefaultView Components render Image not Found if no url exists', () => {
  act(() => {
    render(<ProductDetails 
      product_id={data.two.id}
      info={data.two}
      selectedStyle={data.twoStyles.results[0]}
      indexSelectedStyle={0}
      handleStyleSelection={handleStyleSelection}
    />, container);
  });
  var defaultView = document.getElementById('defaultView');
  var image = defaultView.getElementsByClassName('defaultView');
  var images = document.images;
  
  expect(image.item(0).src).toEqual('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');  
  expect(images.item(0).src).toEqual('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');
  expect(images.item(1).src).toEqual('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');
});
it('ThumbnailList renders only 7 images if there are greater than 7', () => {
  act(() => {
    render(<ProductDetails 
      product_id={data.five.id}
      info={data.five}
      selectedStyle={data.fiveStyles.results[0]}
      indexSelectedStyle={0}
      handleStyleSelection={handleStyleSelection}
    />, container);
  });
  
  var thumbnailList = document.getElementById('thumbnailList');
  var numberOfThumbnails = thumbnailList.childElementCount;

  expect(numberOfThumbnails).toBe(10);
});
