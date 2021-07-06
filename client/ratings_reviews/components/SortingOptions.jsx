import React from 'react';

const SortingOptions = (props) => {
  return (
    <div id='review-sorting-options-container'>
      <label for="options">{props.reviews.length} reviews, sorted by </label>
      <select
        value={props.sortingOption}
        onChange={(e) => props.handleOptionChanges(e.target.value)}
        name='options'
        id='sorting-options'
        class='review-clickable'>
        <option selected='selected' value="relevance">Relevant</option>
        <option value="helpfulness">Helpful</option>
        <option value="date">Newest</option>
      </select>
    </div>
  );
};

export default SortingOptions;