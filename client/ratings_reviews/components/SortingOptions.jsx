import React from 'react';

class SortingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingValue: 'relevance'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleOptionChanges(e.target.value);
    this.setState({
      sortingValue: e.target.value
    });
  }

  render() {
    return (
      <div>
        <label for="options">[Number] reviews, sorted by </label>
        <select value={this.state.value} onChange={this.handleChange} name="options" id="sorting-options">
          <option selected='selected' value="relevance">Relevant</option>
          <option value="helpfulness">Helpful</option>
          <option value="date">Newest</option>
        </select>
      </div>
    );
  }
}

export default SortingOptions;