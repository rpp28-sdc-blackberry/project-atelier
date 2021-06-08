import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {

    this.setState({
      query: event.target.value
    }, () => this.props.handleSearch(this.state.query));


  }

  render() {

    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
      </div>
    );

  }

}

export default Search;