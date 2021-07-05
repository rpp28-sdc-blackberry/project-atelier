import React from 'react';

const SortingOptions = (props) => {
  const handleChange = (e) => {
    props.handleOptionChanges(e.target.value);
  };
  return (
    <div class='review-sorting-options'>
      <label for="options">{props.reviews.length} reviews, sorted by </label>
      <select value={props.sortingOption} onChange={handleChange} name='options' id='sorting-options' class='review-clickable'>
        <option selected='selected' value="relevance">Relevant</option>
        <option value="helpfulness">Helpful</option>
        <option value="date">Newest</option>
      </select>
    </div>
  );
};

export default SortingOptions;