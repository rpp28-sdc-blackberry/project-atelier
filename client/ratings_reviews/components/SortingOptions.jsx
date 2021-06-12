import React from 'react';

class SortingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <label for="options">[Number] reviews, sorted by </label>
        <select name="options" id="sorting-options">
          <option selected='selected' value="relevance">Relevant</option>
          <option value="helpfulness">Helpful</option>
          <option value="date">Newnest</option>
        </select>
      </div>
    );
  }
}

// const SortingOptions = (props) => (
//   <div>
//     <label for="options">[Number] reviews, sorted by </label>
//     <select name="options" id="sorting-options">
//       <option selected='selected' value="relevance">Relevant</option>
//       <option value="helpfulness">Helpful</option>
//       <option value="date">Newnest</option>
//     </select>
//   </div>
// );

export default SortingOptions;