import React from 'react';

const Search = (props) => (

  <div className="qa-search">
    <input
      aria-label="Search through questions"
      className="qa-search-input"
      type="search"
      placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      value={props.query}
      onChange={props.handleSearch}
    />
    {/* <i class="fa fa-search"></i> */}
  </div>
);

export default Search;