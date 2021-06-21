import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        SEARCH BAR
        <input type='text' placeholder='Search'></input>
      </div>
    );
  }
}

export default SearchBar;