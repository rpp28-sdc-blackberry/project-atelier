import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    }, this.props.handleSearch(e.target.value));
  }

  render() {
    return (
      <div>
        SEARCH BAR
        <input type='text' placeholder='Search' value={this.state.keyword} onChange={this.handleChange}></input>
      </div>
    );
  }
}

export default SearchBar;