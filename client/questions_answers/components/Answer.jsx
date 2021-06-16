import React from 'react';
import { formatAnswererName, formatDate } from '../helpers.js';
import HelpfulReport from './HelpfulReport.jsx';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulness: this.props.helpfulness
    };
  }

  handleHelpfulButtonClick() {

  }

  handleReportButtonClick() {

  }

  render() {

    const { answerer_name, date, body } = this.props.answer;

    return (

      <div className="answer">
        <div>
          {body}
          <span> <HelpfulReport
            handleHelpfulButtonClick={() => console.log('helpful clicked')}
            handleReportButtonClick={() => console.log('report clicked')}
            reported={this.state.reported}
            helpfulness={this.state.helpfulness}
            content_id={this.props.answer_id}
            content_type={'answer'}
          />
          </span>
        </div>
        <div>
          <span> by {formatAnswererName(answerer_name)}, {formatDate(date)} </span>
        </div>
      </div>

    );

  }

}

export default Answer;