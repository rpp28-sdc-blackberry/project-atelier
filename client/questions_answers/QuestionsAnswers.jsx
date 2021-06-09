import React from 'react';
import fetchQuestions from './controllers.js';
import QuestionsList from './components/QuestionsList.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.queryPage = 3;

    this.state = {
      product_id: this.props.product_id,
      showMoreAnsweredQuestionsButton: false,
      nextTwoQuestions: [],
      questions: []
    };

    fetchQuestions(this.props.product_id, 4, 1)
      .then((data) => {
        let firstTwoQuestions = data.results.slice(0, 2);
        let nextTwoQuestions = data.results.slice(2);

        if (!firstTwoQuestions.length) {
          return;
        }
        if (!nextTwoQuestions.length) {
          this.setState({
            questions: firstTwoQuestions
          });
          return;
        }

        this.setState({
          showMoreAnsweredQuestionsButton: true,
          nextTwoQuestions: nextTwoQuestions,
          questions: firstTwoQuestions
        });

      });

    this.updateQuestionsList = this.updateQuestionsList.bind(this);
  }

  updateQuestionsList() {

    fetchQuestions(this.state.product_id, 2, this.queryPage)
      .then((data) => {
        if (!data.results.length) {
          this.setState({
            showMoreAnsweredQuestionsButton: false,
            questions: [...this.state.questions, ...this.state.nextTwoQuestions]
          });
        } else {
          this.setState({
            questions: [...this.state.questions, ...this.state.nextTwoQuestions],
            nextTwoQuestions: data.results,
          });
          this.queryPage++;
        }
      });

  }

  render() {

    return (
      <div className="questions-answers component">
        <div> {`QUESTIONS & ANSWERS`} </div>
        <QuestionsList questions={this.state.questions}/>
        {this.state.showMoreAnsweredQuestionsButton && <button onClick={this.updateQuestionsList}>MORE ANSWERED QUESTIONS</button>}
        <button onClick={() => console.log('add a new question by clicking this button')}>ADD A QUESTION</button>
      </div>
    );
  }

}

export default QuestionsAnswers;