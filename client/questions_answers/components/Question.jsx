import React from 'react';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';
import { submitAnswer, markQuestionHelpful, reportQuestion } from '../controllers.js';
import HelpfulReport from './HelpfulReport.jsx';
import { validateFormFields } from '../helpers.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.helpfulness,
      reported: false,
      showAnswerModal: false,
    };
    this.handleAddAnswerClick = this.handleAddAnswerClick.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.closeAnswerModal = this.closeAnswerModal.bind(this);
    this.handleHelpfulButtonClick = this.handleHelpfulButtonClick.bind(this);
    this.handleReportButtonClick = this.handleReportButtonClick.bind(this);
  }

  handleHelpfulButtonClick() {

    markQuestionHelpful(this.props.question_id.toString())
      .then(() => {
        let helpfulQuestions = JSON.parse(localStorage.getItem('helpfulQuestions'));
        helpfulQuestions.push(this.props.question_id);
        localStorage.setItem('helpfulQuestions', JSON.stringify(helpfulQuestions));
        this.setState({
          helpfulness: this.state.helpfulness + 1
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // update the helpfulness counts in the top-level questions lists? --> seems to be working without this step...

  }

  handleReportButtonClick() {

    reportQuestion(this.props.question_id.toString())
      .then(() => {
        this.setState({reported: true});
      })
      .catch((err) => {
        console.log(err);
      });

  }

  closeAnswerModal() {
    this.setState({
      showAnswerModal: false
    });
  }

  handleAddAnswerClick() {
    this.setState({
      showAnswerModal: true
    });
  }

  handleAnswerSubmit(e) {

    e.preventDefault();

    const answer = e.target.answer.value;
    const nickname = e.target.nickname.value;
    const email = e.target.email.value;

    const invalid = validateFormFields(answer, nickname, email);

    if (invalid) {
      alert(invalid);
      return;
    }

    submitAnswer(answer, nickname, email, this.props.question_id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      showAnswerModal: false
    });

  }

  render() {

    return (
      <div className="qa-list-item-container">
        <div className="qa-question-container">
          <span className="qa-question-text">
            {'Q:  '}
            {this.props.question}
          </span>
          <span className="qa-helpful-report-answer">
            <HelpfulReport
              handleHelpfulButtonClick={this.handleHelpfulButtonClick}
              handleReportButtonClick={this.handleReportButtonClick}
              reported={this.state.reported}
              helpfulness={this.state.helpfulness}
              content_id={this.props.question_id}
              content_type={'question'}
            />
            <span>
              {' | '}
            </span>
            <button className="qa-button-link" onClick={this.handleAddAnswerClick}> Add Answer </button>
          </span>
        </div>
        <AnswersList answers={this.props.answers}/>
        {this.state.showAnswerModal && <AnswerForm
          closeAnswerModal={this.closeAnswerModal}
          question={this.props.question}
          name={this.props.name}
          handleAnswerSubmit={this.handleAnswerSubmit}
        />}
      </div>
    );

  }

}

export default Question;