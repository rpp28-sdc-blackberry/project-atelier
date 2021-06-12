import React from 'react';

const Search = (props) => (

  <div>
    <input
      type="text"
      placeholder="Have a question? Search for answers..."
      value={props.query}
      onChange={props.handleSearch}
    />
  </div>
);

export default Search;