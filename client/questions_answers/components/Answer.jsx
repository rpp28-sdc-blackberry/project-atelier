import React from 'react';
import { formatAnswererName, formatDate } from '../helpers.js';
import HelpfulReport from './HelpfulReport.jsx';
import { markAnswerHelpful, reportAnswer } from '../controllers.js';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulness: this.props.helpfulness
    };

    this.handleHelpfulButtonClick = this.handleHelpfulButtonClick.bind(this);
    this.handleReportButtonClick = this.handleReportButtonClick.bind(this);
  }

  handleHelpfulButtonClick() {
    markAnswerHelpful(this.props.answer_id.toString())
      .then(() => {
        let helpfulAnswers = JSON.parse(localStorage.getItem('helpfulAnswers'));
        helpfulAnswers.push(this.props.answer_id);
        localStorage.setItem('helpfulAnswers', JSON.stringify(helpfulAnswers));
        this.props.incrementHelpfulAnswer(this.props.answer_id);
        this.setState({
          helpfulness: this.state.helpfulness + 1
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleReportButtonClick() {
    reportAnswer(this.props.answer_id.toString())
      .then(() => {
        this.setState({reported: true});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const { answerer_name, date, body } = this.props.answer;

    return (

      <div className="qa-answer">
        <div className="qa-answer-text">
          {body}
        </div>
        <div className="qa-answer-footer">
          <span> by {formatAnswererName(answerer_name)}, {formatDate(date)} </span>
          <span> {' | '} </span>
          <span> <HelpfulReport
            handleHelpfulButtonClick={this.handleHelpfulButtonClick}
            handleReportButtonClick={this.handleReportButtonClick}
            reported={this.state.reported}
            helpfulness={this.state.helpfulness}
            content_id={this.props.answer_id}
            content_type={'answer'}
          />
          </span>
        </div>
      </div>

    );

  }

}

export default Answer;