import React from 'react';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import SortingPanel from './components/SortingPanel.jsx';
import ReviewsList from './components/ReviewsList.jsx';
import ReviewForm from './components/ReviewForm.jsx';

const RatingsReviews = (props) => (
  <div>
    ratingsreviews
    <RatingBreakdown />
    <ProductBreakdown />
    <SortingPanel />
    <ReviewsList />
    <ReviewForm />
  </div>
);

export default RatingsReviews;
