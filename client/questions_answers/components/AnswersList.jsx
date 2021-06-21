import React from 'react';
import Answer from './Answer.jsx';
import { sortAnswersList } from '../helpers.js';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      remainingAnswers: [],
      showAnswersList: false,
      showLoadMoreAnswersButton: false,
      showCollapseAnswersListButton: false
    };
    this.initialize();
    this.collapseAnswersList = this.collapseAnswersList.bind(this);
    this.loadRemainingAnswers = this.loadRemainingAnswers.bind(this);
    this.incrementHelpfulAnswer = this.incrementHelpfulAnswer.bind(this);
  }

  initialize() {
    let unsortedAnswersList = Object.values(this.props.answers);
    let sortedAnswersList = sortAnswersList(unsortedAnswersList);
    let firstTwoAnswers = sortedAnswersList.slice(0, 2);
    let remainingAnswers = sortedAnswersList.slice(2);
    if (!!firstTwoAnswers.length) {
      this.state.answers = firstTwoAnswers;
      this.state.showAnswersList = true;
    }
    if (!!remainingAnswers.length) {
      this.state.remainingAnswers = remainingAnswers;
      this.state.showLoadMoreAnswersButton = true;
    }
  }

  collapseAnswersList() {
    this.setState({
      remainingAnswers: this.state.answers.slice(2),
      answers: this.state.answers.slice(0, 2),
      showLoadMoreAnswersButton: true,
      showCollapseAnswersListButton: false
    });
  }

  loadRemainingAnswers() {
    this.setState({
      answers: this.state.answers.concat(this.state.remainingAnswers),
      remainingAnswers: [],
      showLoadMoreAnswersButton: false,
      showCollapseAnswersListButton: true
    });
  }

  incrementHelpfulAnswer(answerId) {
    if (this.state.showCollapseAnswersListButton) {
      this.state.answers.forEach((answer) => {
        if (answer.id === answerId) {
          answer.helpfulness++;
        }
      });
    }

  }

  render() {

    return (
      this.state.showAnswersList &&
      <div className="qa-answers-list-container">
        <b>A:</b>
        {this.state.answers.map((answer) => <Answer
          key={answer.id} answer={answer}
          helpfulness={answer.helpfulness}
          answer_id={answer.id}
          incrementHelpfulAnswer={this.incrementHelpfulAnswer}
        />)}
        {this.state.showLoadMoreAnswersButton && <button onClick={this.loadRemainingAnswers}> See more answers </button>}
        {this.state.showCollapseAnswersListButton && <button onClick={this.collapseAnswersList}> Collapse answers </button>}
      </div>

    );
  }
}

export default AnswersList;