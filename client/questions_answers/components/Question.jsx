import React from 'react';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';
import { submitAnswer, markQuestionHelpful, reportQuestion } from '../controllers.js';

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

    // validate the form fields using a helper function that returns a boolean value
    // if that doesnt pass--display an alert popup
    // otherwise

    submitAnswer(e.target.answer.value, e.target.nickname.value, e.target.email.value, this.props.question_id)
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
    let renderReportedLink, renderHelpfulLink;

    if (this.state.reported) {
      renderReportedLink = (<span> Reported </span>);
    } else {
      renderReportedLink = (<button onClick={this.handleReportButtonClick}> Report </button>);
    }

    let helpfulQuestions = JSON.parse(localStorage.getItem('helpfulQuestions'));

    if (helpfulQuestions.includes(this.props.question_id)) {
      renderHelpfulLink = <span> {`Helpful? Yes ${this.state.helpfulness}`}</span>;
    } else {
      renderHelpfulLink = <span>
        <span> Helpful? </span>
        <button onClick={this.handleHelpfulButtonClick}> {`Yes ${this.state.helpfulness}`} </button>
      </span>;
    }


    return (
      <div className="qa-item">
        <b> {`Q: ${this.props.question}`} </b>
        <span>
          {renderHelpfulLink}
          {renderReportedLink}
        </span>
        <button onClick={this.handleAddAnswerClick}> Add Answer </button>
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