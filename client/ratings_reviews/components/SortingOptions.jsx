import React from 'react';

const SortingOptions = (props) => {
  return (
    <div className='review-sorting-options'>
      <label htmlFor="options">{props.reviews.length} reviews, sorted by </label>
      <select
        value={props.sortingOption}
        onChange={(e) => props.handleOptionChanges(e.target.value)}
        name='options'
        id='sorting-options'
        className='review-clickable'>
        <option selected='selected' value="relevance">Relevant</option>
        <option value="helpfulness">Helpful</option>
        <option value="date">Newest</option>
      </select>
    </div>
  );
};

export default SortingOptions;