import React from 'react';
import { formatAnswererName, formatDate } from '../helpers.js';
import HelpfulReport from './HelpfulReport.jsx';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false
    };
  }

  render() {

    const { answerer_name, date, body } = this.props.answer;

    return (

      <div className="answer">
        <div>
          {body}
          <span> helpful report </span>
        </div>
        <div>
          <span> by {formatAnswererName(answerer_name)}, {formatDate(date)} </span>
        </div>
      </div>

    );

  }

}

export default Answer;