import React from 'react';

class SortingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingValue: 'relevance'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.setState({
        sortingValue: 'relevance'
      });
    }
  }

  handleChange(e) {
    this.props.handleOptionChanges(e.target.value);
    this.setState({
      sortingValue: e.target.value
    });
  }

  render() {
    return (
      <div class='review-sorting-options'>
        <label for="options">{this.props.reviews.length} reviews, sorted by </label>
        <select value={this.state.sortingValue} onChange={this.handleChange} name='options' id='sorting-options' class='review-clickable'>
          <option selected='selected' value="relevance">Relevant</option>
          <option value="helpfulness">Helpful</option>
          <option value="date">Newest</option>
        </select>
      </div>
    );
  }
}

export default SortingOptions;